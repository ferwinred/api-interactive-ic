// dto/auth-code.dto.ts
import { IsString } from 'class-validator';

export class AuthTokenDto {
  @IsString()
  token: string;
}
