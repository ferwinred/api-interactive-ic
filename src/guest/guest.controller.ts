// guest.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards, Delete, Patch } from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest } from './guest.entity';
import { ObjectId } from 'mongodb';
import { GuestDto } from './dto/guest.dto';
import { ResponseGuest } from 'src/common/interface/response.interface';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GuestUpdateDto } from './dto/guest-update.dto';


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

  @Patch('/confirmation/:id')
  async confirmGuest(@Body() body: { status: string }, @Param('id') id: string): Promise<ResponseGuest> {
    const { status } = body;
    return this.guestService.confirmGuest(status, new ObjectId(id));
  }

  @Patch('/:id')
  async updateGuest(@Body() guestDto: GuestUpdateDto, @Param('id') id: string): Promise<ResponseGuest> {
    console.log(guestDto, id);
    const updatedGuest = await this.guestService.updateGuest(new ObjectId(id), guestDto);
    return { message: 'Guest successfully updated', guest: updatedGuest };

  }


  @Delete('/:id')
  async deleteGuest(@Param('id') id: string): Promise<{ message: string }> {
    const guest = await this.guestService.deleteGuest(new ObjectId(id));
    return { message: guest.message };
  }
}
