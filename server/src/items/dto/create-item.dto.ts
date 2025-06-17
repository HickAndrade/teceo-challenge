import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ItemStatus } from '../entities/item.entity'

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  type: string

  @IsString()
  size: string

  @IsString()
  color: string

  @IsNumber()
  quantity: number

  @IsEnum(['success', 'error'])
  status: ItemStatus
}
