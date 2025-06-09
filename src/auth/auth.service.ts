import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InvitationService } from 'src/invitation/invitation.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly jwtService: JwtService
  ) {}

  async login(code: string) {
    const invitation = await this.invitationService.getInvitation(code);
    if (!invitation) {
      throw new UnauthorizedException('Código inválido');
    }

    const payload = { sub: invitation._id.toString(), code: invitation.code };

    return {
      token: this.jwtService.sign(payload),
      code: invitation.code
    };
  }
}
