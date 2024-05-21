import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { faker } from '@faker-js/faker';
import { createRandomCustomer } from './mockData/customers.mock';

@Injectable()
export class CustomersService {
  private customers: Customer[] = faker.helpers.multiple(createRandomCustomer, { count: 100 });
  private maxCustomers = 1000000;

  findAll(): Customer[] {
    return this.customers;
  }

  findOneById(id: number): Customer {
    const customer = this.findCustomerById(id);
    if (!customer) throw new NotFoundException(`Customer with id ${id} not found.`);
    return customer;
  }

  create(customer: CreateCustomerDto): Customer {
    if (this.customers.length >= this.maxCustomers) {
      throw new InternalServerErrorException('Customers limit reached');
    }

    const { firstName, lastName, age, middleName } = customer;

    const newCustomer: Customer = {
      id: this.generateUniqueCustomerId(),
      firstName,
      lastName,
      age
    }
    if (middleName) newCustomer.middleName = middleName;

    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, customer: UpdateCustomerDto): Customer {
    const customerIndex = this.customers.findIndex((customer) => customer.id === id);

    if (customerIndex === -1) throw new NotFoundException(`Customer with id ${id} not found.`);

    const { firstName, lastName, age, middleName } = customer;

    const updatedCustomer: Customer = {
      id,
      firstName,
      lastName,
      age
    }
    if (middleName) updatedCustomer.middleName = middleName;

    this.customers[customerIndex] = updatedCustomer;
    return this.customers[customerIndex];
  }

  private generateUniqueCustomerId(): number {
    let newId: number;
    do {
      newId = this.getRandomInt(1, 1000000);
    } while (!this.isIdUnique(newId));
    return newId;
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private findCustomerById(id: number): Customer {
    return this.customers.find(c => c.id === id);
  }

  private isIdUnique(id: number): boolean {
    return this.findCustomerById(id) ? true : false;
  }
}
