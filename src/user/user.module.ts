import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
//import { AuthGuard } from '../auth/auth.guard';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    /*{
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },*/
    UserService,
  ],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
