import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @ApiProperty({
    description: 'The age of a customer',
    maximum: 1,
    default: 1
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  age: number;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsAlpha()
  middleName?: string;
}