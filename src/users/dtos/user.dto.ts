import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUserDto {
  @IsOptional()
  @IsPositive()
  _end: number;

  @IsOptional()
  @Min(0)
  _start: number;
}
