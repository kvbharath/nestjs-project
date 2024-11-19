// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  create(name: string, description: string): Item {
    const newItem = {
      id: this.items.length + 1,
      name,
      description,
      createdAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    return this.items.find((item) => item.id === id);
  }

  update(id: number, name: string, description: string): Item {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      this.items[itemIndex].name = name;
      this.items[itemIndex].description = description;

      return this.items[itemIndex];
    }
    return null;
  }

  remove(id: number): boolean {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
      return true;
    }
    return false;
  }
}
