import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
  IsEmail,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly propertyType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly photo: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;
}

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}

export class FilterPropertyDto {
  @IsOptional()
  @Min(0)
  _start: number;

  @IsOptional()
  @IsPositive()
  _end: number;

  @IsOptional()
  @IsPositive()
  _sort: any;

  @IsOptional()
  @IsPositive()
  _order: any;

  @IsOptional()
  @IsString()
  title_like: string;

  @IsOptional()
  @IsString()
  propertyType: string;
}
