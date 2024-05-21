import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { faker } from '@faker-js/faker';
import { createRandomCustomer } from './mockData/customers.mock';

describe('CustomersService', () => {
  let service: CustomersService;
  let expectedCustomers: Customer[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);

    expectedCustomers = faker.helpers.multiple(createRandomCustomer, { count: 200 });
    service['customers'] = expectedCustomers;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all customers', () => {
    const customers = service.findAll();

    expect(customers).toBe(expectedCustomers);
    expect(customers).toHaveLength(expectedCustomers.length);
  })

  it('should return specific customer by ID', () => {
    const customerTwo = expectedCustomers[1];
    const customerTwoId = customerTwo.id;

    const customer = service.findOneById(customerTwoId);

    expect(customer).toBe(customerTwo);
    expect(customer.id).toBe(customerTwoId);
    expect(customer.firstName).toBe(customerTwo.firstName);
    expect(customer.age).toBe(customerTwo.age);
    expect(customer.lastName).toBe(customerTwo.lastName);
  })

  it('should create new customer with middle name', () => {
    const newCustomer: CreateCustomerDto = {
      age: 89,
      firstName: 'Guy',
      lastName: 'New',
      middleName: 'The'
    };

    const customer = service.create(newCustomer);

    const { id } = customer;
    const createdCustomer: Customer = {
      id,
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      age: newCustomer.age,
      middleName: newCustomer.middleName
    }

    expect(customer).toStrictEqual(createdCustomer);
  })

  it('should create new customer without middle name', () => {
    const newCustomer: CreateCustomerDto = {
      age: 81,
      firstName: 'No',
      lastName: 'Middle',
    };

    const customer = service.create(newCustomer);

    const { id, middleName } = customer;
    const createdCustomer: Customer = {
      id,
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      age: newCustomer.age
    }
    if (middleName) createdCustomer.middleName = middleName;

    expect(customer).toStrictEqual(createdCustomer);
  })

  it('should update existing customer', () => {
    const customerThreeId = expectedCustomers[2].id;
    const updateCustomerData: UpdateCustomerDto = {
      age: 75,
      firstName: 'Updated',
      lastName: 'Customer',
    };

    const customer = service.update(customerThreeId, updateCustomerData);

    const { id, middleName } = customer;
    const updatedCustomer: Customer = {
      id,
      firstName: updateCustomerData.firstName,
      lastName: updateCustomerData.lastName,
      age: updateCustomerData.age
    }
    if (middleName) updatedCustomer.middleName = middleName;

    expect(customer).toStrictEqual(updatedCustomer);
  })
});
