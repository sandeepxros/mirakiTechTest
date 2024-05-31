import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

export enum UserType {
  Admin = 'Admin',
  User = 'User',
}

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'First name of the user', required: true })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ description: 'Middle name of the user' })
  @Prop()
  middleName: string;

  @ApiProperty({ description: 'Last name of the user', required: true })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ description: 'Email of the user', required: true })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'Encrypted password of the user',
    required: true,
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: 'Role of the user (Admin or User)',
    required: true,
    enum: UserType,
  })
  @Prop({ required: true, enum: UserType })
  role: string;

  @ApiProperty({ description: 'Department of the user' })
  @Prop()
  department: string;

  @ApiProperty({ description: 'added by user' })
  @Prop()
  addedBy: string;
}

const UserSchema = SchemaFactory.createForClass(User);

// Hash the password before saving or updating
UserSchema.pre<UserDocument>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

export { UserSchema };
