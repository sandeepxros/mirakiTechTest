import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.model';
import { LoginDto } from './dto/auth.dto';
import { UserPayload } from 'src/types/UserPayload.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user) throw new BadRequestException('user is not registerd');

    const isPasswordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatched)
      throw new BadRequestException('Invalid email or Password');

    delete user.password;

    return { token: await this.generateJwt(user) };
  }

   whoAmI(user: UserPayload) {
    return this.userModel.findOne({ _id: user.userId }).select('-password');
  }

  private async generateJwt(user: UserDocument) {
    return await this.jwtService.signAsync({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  }
}
