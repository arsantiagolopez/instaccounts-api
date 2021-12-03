import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities';

@Entity('instagrams')
export class Instagram {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id!: string;

  @Column({ nullable: false, unique: true })
  username!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: false, default: false })
  isAuthorized!: boolean;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: false, default: new Date() })
  lastActive!: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.instagrams)
  userId!: string;
}
