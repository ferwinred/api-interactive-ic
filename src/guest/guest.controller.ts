// guest.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { GuestService } from './guest.service';
import { AuthCodeDto } from '../auth/dto/auth-code.dto';
import { Guest } from './guest.entity';
import { ObjectId } from 'typeorm';
import { GuestDto } from './dto/guest.dto';
import { ResponseGuest } from 'src/common/interface/response.interface';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@Controller('guests')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

 @Get('/:invitation')
 async getGuests(@Param('code') invitation: ObjectId): Promise<Guest[]> {
    return this.guestService.getGuestsByCode(invitation);
 }

  @Post('')
  async createGuest(@Body() guestDto: GuestDto): Promise<ResponseGuest> {
    return this.guestService.createGuest(guestDto);
  }
}
