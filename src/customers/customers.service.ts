import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  private readonly customers: Customer[] = [];

  findAll(): Customer[] {
    return this.customers;
  }

  findOneById(id: number): Customer {
    const customer = this.findCustomerById(id);
    if (!customer) throw new NotFoundException(`Customer with id ${id} not found.`);
    return customer;
  }

  create(customer: CreateCustomerDto): Customer {
    const customerId = this.getRandomInt(1, 1000000);
    const newCustomer: Customer = {
      ...customer,
      id: customerId
    }

    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, customer: UpdateCustomerDto): Customer {
    console.log('ID received: ', id);
    const customerIndex = this.customers.findIndex((customer) => customer.id === id);
    console.log('customerIndex: ', customerIndex);
    console.log('find: ', this.findCustomerById(id));

    if (customerIndex === -1) throw new NotFoundException(`Customer with id ${id} not found.`);
    const updatedCustomer: Customer = {
      ...customer,
      id
    }
    this.customers[customerIndex] = updatedCustomer;
    return this.customers[customerIndex];
  }

  private getRandomInt(min: number, max: number): number {
    if (this.customers.length >= max) {
      throw new InternalServerErrorException('Customers limit reached');
    }
    min = Math.ceil(min);
    max = Math.ceil(max);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (this.isIdUnique(randomNumber)) {
      this.getRandomInt(min, max);
    }
    return randomNumber
  }

  private findCustomerById(id: number): Customer {
    return this.customers.find(c => c.id === id);
  }

  private isIdUnique(id: number): boolean {
    return this.findCustomerById(id) ? true : false;
  }
}
