// guest.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Guest } from './guest.entity';
import { Invitation } from 'src/invitation/invitation.entity';
import { ObjectId } from 'mongodb';
import { GuestDto } from './dto/guest.dto';
import { InvitationService } from 'src/invitation/invitation.service';

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
    const newGuest = this.guestRepo.create(guest);

    await this.guestRepo.save(newGuest);

    return {
        message: 'Guest succesfully created',
        guest: newGuest
    }
  }
}
