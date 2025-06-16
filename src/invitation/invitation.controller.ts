// guest.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { Invitation } from './invitation.entity';
import { InvitationDto } from './dto/invitation.dto';

@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Get('getInvitation/:code')
  async authenticate(@Param('code') code: string): Promise<Invitation> {
    return this.invitationService.getInvitation(code);
  }

  @Get('getInvitation/token/:token')
  async getInvitationByToken(@Param('token') token: string): Promise<Invitation> {
    return this.invitationService.getInvitationByToken(token);
  }

  @Post('')
  async createInvitation(@Body() invitationDto: InvitationDto){
    return this.invitationService.createInvitation(invitationDto);
  }

  @Get('')
  async getAllInvitations(): Promise<Invitation[]> {
    return this.invitationService.getAllInvitations();
  }

}
