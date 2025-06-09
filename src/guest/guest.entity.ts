// guest.entity.ts
import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Status } from 'src/common/enums/guest.enum';

@Entity()
export class Guest {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  invitation: ObjectId; // Referencia al invitationId

  @Column({ default: 'pending' })
  status: Status;

  @Column({ default: false })
  is_main_guest: boolean

}

