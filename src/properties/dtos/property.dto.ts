import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  IsArray,
  IsEmail,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/user.dto';

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

  @IsArray()
  @IsNotEmpty()
  readonly creator: string[];
}

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}

export class FilterPropertyDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
