// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestModule } from './guest/guest.module';
import { Guest } from './guest/guest.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Invitation } from './invitation/invitation.entity';
import { InvitationModule } from './invitation/invitation.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // Hace disponible ConfigService en toda la app
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mongodb',
        url: config.get<string>('MONGODB_URI'),
        database: config.get<string>('MONGO_DB'),
        entities: [Guest, Invitation],
        synchronize: true,
      }),
    }),
    GuestModule,
    InvitationModule,
    AuthModule
  ],
})
export class AppModule {}
