import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gaurd/auth.gaurd';
import getEnvVariable from './config/envVariables';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: getEnvVariable('JWT_SECRET'),
      signOptions: { expiresIn: '5h' },
    }),
    MongooseModule.forRoot(getEnvVariable('MONGODB_URI')),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
