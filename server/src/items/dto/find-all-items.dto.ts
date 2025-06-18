import { Item } from '../entities/item.entity';

export class FindAllItemsResponseDto {
  items: Item[];
  total: number;
  totalSuccess: number;
  totalError: number;
}
