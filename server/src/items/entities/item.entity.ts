import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

export enum ItemStatus {
  Success = 'success',
  Error = 'error'
}

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  type: string

  @Column()
  size: string

  @Column()
  color: string

  @Column()
  quantity: number

   @Column({ type: 'enum', enum: ItemStatus, default: ItemStatus.Success })
  status: ItemStatus;

  @CreateDateColumn()
  createdAt: Date
}
