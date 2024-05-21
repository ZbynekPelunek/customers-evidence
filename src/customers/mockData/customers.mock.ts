import { faker } from '@faker-js/faker';
import { Customer } from '../interfaces/customer.interface';

export function createRandomCustomer(): Customer {
  const maybe = <T>(generator: () => T): T | undefined => {
    return Math.random() > 0.5 ? generator() : undefined;
  };

  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 105 }),
    middleName: maybe(() => faker.person.middleName())
  }
}