import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MoneyStacksService } from './money-stacks.service';
import { CreateMoneyStackDto } from './dto';
import { GetCurrentUser } from 'src/shared/decorators';

@Controller('money-stacks')
export class MoneyStacksController {
  constructor(private readonly moneyStacksService: MoneyStacksService) {}

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.moneyStacksService.findOneById(id);
  }

  @Post()
  create(
    @Body() data: CreateMoneyStackDto,
    @GetCurrentUser('sub') userId: string,
  ) {
    const { title, description, initialAmount } = data;

    return this.moneyStacksService.create({
      title: title,
      description: description,
      initialAmount: initialAmount,
      previousAmount: initialAmount,
      currentAmount: initialAmount,
      user: { connect: { id: userId } },
    });
  }
}