import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/common/enums/guest.enum';
import { ObjectId } from 'mongodb';

export class GuestDto {

  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @Transform(({ value }) => new ObjectId(value), { toClassOnly: true })
  invitation: ObjectId;

  @IsEnum(Status)
  status: Status

  @IsBoolean()
  is_main_guest?: boolean;

  @IsOptional()
  tag?: string;

}
