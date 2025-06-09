// guest.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './guest.entity';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { InvitationService } from 'src/invitation/invitation.service';
import { Invitation } from 'src/invitation/invitation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guest])
],
  providers: [GuestService],
  controllers: [GuestController],
})
export class GuestModule {}
