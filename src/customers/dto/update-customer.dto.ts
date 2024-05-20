import { IsNotEmpty, IsAlpha, IsInt, IsPositive } from 'class-validator';

export class UpdateCustomerDto {
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  age: number;

  middleName?: string;
}