import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { UserType } from 'src/models/user.model';
import { Public } from '../../decorators/auth.decorator';
import { User } from '../../decorators/user.decorator';
import { UserPayload } from '../../types/UserPayload.type';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createProfile')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  createProfile(
    @Body() createUserDto: CreateUserDto,
    @User() user: UserPayload,
  ) {
    return this.userService.createUser(createUserDto, user);
  }

  @Patch('updateUser/:id')
  @Role(UserType.Admin)
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: UserPayload,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get('getUser/:id')
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch('updateMyProfile')
  @ApiResponse({ status: 201, description: 'Profile updated successfully' })
  updateMyProfile(
    @Body() updateUserProfileDto: UpdateUserDto,
    @User() user: UserPayload,
  ) {
    return this.userService.updateUser(user.userId, updateUserProfileDto);
  }
}
