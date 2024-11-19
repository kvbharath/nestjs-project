// src/items/items.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(
    @Body('name') name: string,
    @Body('description') description: string,
  ): Item {
    return this.itemsService.create(name, description);
  }

  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Item {
    return this.itemsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
  ): Item {
    return this.itemsService.update(id, name, description);
  }

  @Delete(':id')
  remove(@Param('id') id: number): boolean {
    return this.itemsService.remove(id);
  }
}
