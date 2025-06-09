import { Guest } from "src/guest/guest.entity";
import { Invitation } from "src/invitation/invitation.entity";

export interface ResponseGuest {
    message: string,
    guest: Guest
}

export interface ResponseInvitation {
    message: string
    invitation: Invitation
}