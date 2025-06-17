import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private readonly itemRepo: Repository<Item>) {}
  
  async findAll(offset = 0, limit = 20): Promise<Item[]> {
    return this.itemRepo.find({
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
    });
  }

  async update(id: string, dto: UpdateItemDto): Promise<Item> {
    await this.itemRepo.update(id, dto);
    return this.itemRepo.findOneByOrFail({ id });
  }

  async bulkUpdate(ids: string[], data: Partial<Item>): Promise<void> {
    await this.itemRepo.update(ids, data);
  }
}
