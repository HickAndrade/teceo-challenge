import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ItemsService } from './items.service';

import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(@Query('offset') offset = 0, @Query('limit') limit = 20) {
    return this.itemsService.findAll(Number(offset), Number(limit));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Post('bulk')
  bulkUpdate(@Body() body: { ids: string[]; data: Partial<UpdateItemDto> }) {
    return this.itemsService.bulkUpdate(body.ids, body.data);
  }
}
