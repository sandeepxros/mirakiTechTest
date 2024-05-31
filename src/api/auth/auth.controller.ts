import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/decorators/auth.decorator';
import { LoginDto } from './dto/auth.dto';
import { User } from 'src/decorators/user.decorator';
import { UserPayload } from 'src/types/UserPayload.type';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
@ApiBearerAuth()
export class AuthControler {
  constructor(private readonly authService: AuthService, private readonly userService:UserService) {}

  @Public()
  @Post('login')
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('whoAmI')
  @ApiResponse({ status: 201, description: 'Logged in user data' })
  whoAmI(@User() user: UserPayload) {
    return this.authService.whoAmI(user);
  }

  @Public()
  @Post('singup')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  singup(
    @Body() createUserDto: CreateUserDto,
    @User() user: UserPayload,
  ) {
    return this.userService.createUser(createUserDto, user);
  }

}
