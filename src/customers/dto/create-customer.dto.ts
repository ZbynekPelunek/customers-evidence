import { IsAlpha, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateCustomerDto {
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

  @IsOptional()
  @IsAlpha()
  middleName?: string;
}