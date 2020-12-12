import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Subscription from './subscription';
import User from './User';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.event, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Subscription, subscription => subscription.event)
  subscription: Subscription;

  @Column()
  place: string;

  @Column('timestamp with time zone')
  dateEvent: Date;

  @Column('timestamp with time zone')
  deadline: Date;

  @Column('int')
  minimumAge: number;

  @Column('int')
  maximumQuantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Event;
