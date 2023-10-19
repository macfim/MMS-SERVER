import { Injectable, NotFoundException } from '@nestjs/common';
import { MoneyStack, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MoneyStacksService {
  private readonly moneyStacks: Prisma.MoneyStackDelegate<DefaultArgs>;

  constructor(private readonly databaseService: DatabaseService) {
    this.moneyStacks = this.databaseService.moneyStack;
  }

  async findOneById(id: MoneyStack['id']) {
    const moneyStack = await this.moneyStacks.findUnique({
      where: { id },
    });

    if (!moneyStack) {
      throw new NotFoundException('Money Stack Not Found');
    }

    return moneyStack;
  }

  create(data: Prisma.MoneyStackCreateArgs['data']) {
    return this.moneyStacks.create({ data });
  }

  delete(id: MoneyStack['id']) {
    return this.moneyStacks.delete({
      where: { id },
    });
  }
}
