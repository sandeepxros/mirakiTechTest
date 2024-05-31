import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from 'src/api/user/dto/user.dto';
import { User, UserDocument, UserType } from 'src/models/user.model';
import { UserPayload } from 'src/types/UserPayload.type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto, user: UserPayload) {
    console.log(user, 'saf');
    if (user?.role === UserType.User && createUserDto.role === UserType.Admin)
      throw new BadRequestException('You cant create an admin ');

    if (createUserDto.password != createUserDto.confirmPassword)
      throw new BadRequestException(
        'Password and Confirm Password should be same',
      );

    const isUserAlreadyExists = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (isUserAlreadyExists)
      throw new BadRequestException('User Already Exists, please login');

    const createdUser = new this.userModel(createUserDto);
    createdUser.addedBy = user?.userId ?? null;

    await createdUser.save();

    return { message: 'User created successfully' };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({
        email: updateUserDto.email,
      });
      if (existingUser && existingUser._id != id) {
        throw new BadRequestException('This email belongs to someone else');
      }
    }
    Object.assign(existingUser, updateUserDto);
    existingUser.save();
    return { message: 'Profile Updated successfully ' };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
