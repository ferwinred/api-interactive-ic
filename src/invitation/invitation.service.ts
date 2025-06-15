// guest.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Invitation } from './invitation.entity';
import { InvitationDto } from './dto/invitation.dto';
import { ResponseInvitation } from 'src/common/interface/response.interface';
import { Guest } from 'src/guest/guest.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepo: MongoRepository<Invitation>,
  ) {}

  async getInvitation(code: string): Promise<Invitation> {
    //const invitation = await this.invitationRepo.findOne({ where: { code } });

    const invitation = await this.invitationRepo
      .aggregate([
        {
          $match: {
            code: code,
          },
        },
        {
          $lookup: {
            from: 'guest', // nombre de la colección de invitados
            localField: '_id',
            foreignField: 'invitation',
            as: 'guests',
          },
        },
        {
          $limit: 1,
        },
      ])
      .toArray();

    if (!invitation[0]) {
      throw new NotFoundException('Código inválido');
    }
    return invitation[0];
  }

  async createInvitation(
    invitation: InvitationDto,
  ): Promise<ResponseInvitation> {
    const newInvitation = this.invitationRepo.create(invitation);

    await this.invitationRepo.save(newInvitation);

    return {
      message: 'Invitation created succesfully',
      invitation: newInvitation,
    };
  }

  async getInvitationByToken(token: string): Promise<Invitation> {
    const invitation = await this.invitationRepo.findOne({ where: { token } });

    if(!invitation) {
      throw new NotFoundException('Token inválido');
    }

    return invitation;
  }

}
