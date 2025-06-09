// dto/auth-code.dto.ts
import { IsString } from 'class-validator';

export class AuthCodeDto {
  @IsString()
  code: string;
}
