import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { GuestModule } from '../guest/guest.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../common/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InvitationService } from 'src/invitation/invitation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from 'src/invitation/invitation.entity';

@Module({
  imports: [
    GuestModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '6h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Invitation])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, InvitationService],
})
export class AuthModule {}
