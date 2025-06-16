// guest.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Guest } from './guest.entity';
import { Invitation } from 'src/invitation/invitation.entity';
import { ObjectId } from 'mongodb';
import { GuestDto } from './dto/guest.dto';
import { InvitationService } from 'src/invitation/invitation.service';
import { GuestUpdateDto } from './dto/guest-update.dto';
import { Status } from 'src/common/enums/guest.enum';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private guestRepo: MongoRepository<Guest>,
  ) {}

  async authenticateByCode(code: string): Promise<Guest> {
    const guest = await this.guestRepo.findOne({ where: { code } });
    if (!guest) {
      throw new NotFoundException('Código inválido');
    }
    return guest;
  }

  async getGuestsByCode (invitation: ObjectId){
    const guests = await this.guestRepo.find({ where: {invitation: invitation}});

    return guests;

  }

  async createGuest(guest: GuestDto){

    if(guest.name === '' || guest.last_name === ''){
      throw new BadRequestException('Nombre y Apellido son requeridos');
    }

    const newGuest = this.guestRepo.create(guest);

    await this.guestRepo.save(newGuest);

    return {
        message: 'Guest succesfully created',
        guest: newGuest
    }
  }

  async updateGuest(id: ObjectId, guestDto: GuestUpdateDto) {
    const guest = await this.guestRepo.findOne({ where: { _id: id } });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    // Update the guest properties
    Object.assign(guest, guestDto);

    console.log(guest);
    // Save the updated guest
    await this.guestRepo.save(guest);

    return guest;
  }

  async deleteGuest(id: ObjectId) {
    const guest = await this.guestRepo.findOne({ where: { _id: id } });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    await this.guestRepo.delete(id);

    return {
      message: 'Guest successfully deleted',
      guest: guest
    };
  }

  async confirmGuest(status: string, id: ObjectId): Promise<Guest> {
    const validStatuses = ['pending', 'confirmed', 'declined'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    const guest = await this.guestRepo.findOne({ where: { _id: id } });
    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    guest.status = status == 'confirmed' ? Status.CONFIMED: Status.PENDING;

    await this.guestRepo.save(guest);

    return guest;
  }

  async getAllGuests(): Promise<Guest[]> {
    const guests = await this.guestRepo.aggregate([
      {
        $lookup: {
          from: 'invitation', // nombre de la colección
          localField: 'invitation',
          foreignField: '_id',
          as: 'invitationData'
        }
      },
      {
        $unwind: {
          path: '$invitationData',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          name: 1,
          status: 1,
          last_name: 1,
          is_main_guest: 1,
          code: '$invitationData.code',
          invitation: 1 // si quieres mantener el ObjectId también
        }
      }
    ]).toArray();

    return guests;

  }
}
