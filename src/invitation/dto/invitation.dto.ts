import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { InvitationStatus } from 'src/common/enums/invitation.enum';
import { Guest } from 'src/guest/guest.entity';

export class InvitationDto {

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  @IsArray()
  guests?: Guest[];

  @IsEnum(InvitationStatus)
  status: InvitationStatus;

  @IsNumber()
  max_guests: number;

}
