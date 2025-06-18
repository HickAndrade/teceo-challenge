import { Injectable } from '@nestjs/common';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, ItemStatus } from './entities/item.entity';
import { Repository } from 'typeorm';
import { FindAllItemsResponseDto } from './dto/find-all-items.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private readonly itemRepo: Repository<Item>) {}
  
  async findAll(offset = 0, limit = 20): Promise<FindAllItemsResponseDto> {
  const [items, total] = await this.itemRepo.findAndCount({
        order: { createdAt: 'DESC' },
        skip: offset,
        take: limit,
      });

    
    const totalSuccess = await this.itemRepo.count({ where: { status: ItemStatus.Success } });
    const totalError = await this.itemRepo.count({ where: { status: ItemStatus.Error } });

    return {
      items,
      total,
      totalSuccess,
      totalError,
    };
  }

  async update(id: string, dto: UpdateItemDto): Promise<Item> {
    await this.itemRepo.update(id, dto);
    return this.itemRepo.findOneByOrFail({ id });
  }

  async bulkUpdate(ids: string[], data: Partial<Item>): Promise<{success: boolean}| undefined> {
    if (!data || Object.keys(data).length === 0) return;
    await this.itemRepo.update(ids, data);
    return { success: true };
  }
}
