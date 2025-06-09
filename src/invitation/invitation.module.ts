// invitation.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation])],
  providers: [InvitationService],
  controllers: [InvitationController],
})
export class InvitationModule {}