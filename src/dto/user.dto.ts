import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength
} from 'class-validator';
import { UserType } from 'src/models/user.model';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user', required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Middle name of the user' })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({ description: 'Last name of the user', required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email of the user', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the user', required: true })
  @IsStrongPassword()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'confirm password', required: true })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    description: 'Role of the user (Admin or User)',
    required: true,
    enum: UserType,
  })
  @IsEnum(UserType)
  role: UserType;

  @ApiProperty({ description: 'Department of the user' })
  @IsString()
  department?: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'First name of the user' })
  firstName?: string;

  @ApiProperty({ description: 'Middle name of the user' })
  middleName?: string;

  @ApiProperty({ description: 'Last name of the user' })
  lastName?: string;

  @ApiProperty({ description: 'Email of the user' })
  email?: string;

  @ApiProperty({ description: 'Department of the user' })
  department?: string;
}
