import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

export type ItemStatus = 'success' | 'error'

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

  @Column({ type: 'enum', enum: ['success', 'error'], default: 'success' })
  status: ItemStatus

  @CreateDateColumn()
  createdAt: Date
}
