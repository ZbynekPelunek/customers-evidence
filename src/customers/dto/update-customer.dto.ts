import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsAlpha, IsInt, IsPositive } from 'class-validator';

export class UpdateCustomerDto {
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
  middleName?: string;
}