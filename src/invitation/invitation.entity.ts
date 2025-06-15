// Invitation.entity.ts
import { Entity, ObjectIdColumn, Column, OneToMany } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Guest } from 'src/guest/guest.entity';
import { InvitationStatus } from 'src/common/enums/invitation.enum';

@Entity()
export class Invitation {

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  code: string;

  @Column()
  token: string;

  @Column({ default: 'send' })
  status: InvitationStatus;

  @Column({ default: false})
  isEclusive: boolean;

  @Column()
  max_guests: number;

   // Solo decorativo en MongoDB (no crea joins, pero útil para referencia en TypeORM)
  @OneToMany(() => Guest, (guest) => guest.invitation)
  guests: Guest[];

}