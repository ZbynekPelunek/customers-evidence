import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './interfaces/customer.interface';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) { }

  @Get()
  findAll(): Customer[] {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Customer {
    return this.customersService.findOneById(id);
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Customer {
    return this.customersService.create(createCustomerDto);
  }

  @Put(':id')
  edit(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto): Customer {
    return this.customersService.update(id, updateCustomerDto);
  }
}
