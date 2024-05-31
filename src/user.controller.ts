import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBearerAuth()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiBearerAuth()
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiBearerAuth()
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }
}
