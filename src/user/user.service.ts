import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { CustomException } from '../common/common.params';
import { CustomHttpStatus } from '../common/httpStatus.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Create a new user
   * @param userDto User data
   * @returns User
   * @throws Error if user already exists or if there is an error creating the user
   * @param userDto
   * @returns Promise<User> | Promise<Error>
   */
  async createUser(userDto: UserDto): Promise<User | Error> {
    const user = await this.userModel.findOne({ username: userDto.username });
    if (user) {
      throw new CustomException(
        'User already exists',
        CustomHttpStatus.BAD_REQUEST,
      );
    }
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(userDto.password, saltOrRounds);
      userDto.password = hash;
      console.log(userDto);
      return await this.userModel.create(userDto);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  /**
   * Find a user by username
   * @param username Username
   * @returns User
   * @throws Error if user does not exist
   * @param username
   * @returns Promise<User> | Promise<Error>
   */
  async findUserByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new CustomException('User not found', CustomHttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * find all users
   * @returns User[]
   * @throws Error if there is an error finding users
   * @returns Promise<User[]> | Promise<Error>
   */
  async findAllUsers(): Promise<User[] | Error> {
    try {
      const users = await this.userModel.find();
      if (!users) {
        throw new CustomException(
          'Users not found',
          CustomHttpStatus.NOT_FOUND,
        );
      }
      return users;
    } catch (error) {
      throw new CustomException(
        'Internal server error',
        CustomHttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Update a user by username
   * @param username Username
   * @body userDto User data
   * @returns Promise<User> | Promise<Error>
   */
  async updateUserByUsername(
    username: string,
    userDto: UserDto,
  ): Promise<User | Error> {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { username },
        userDto,
        { new: true },
      );
      if (!user) {
        throw new CustomException('User not found', CustomHttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new CustomException(
        'Internal server error',
        CustomHttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Delete a user by username
   * @param username Username
   * @returns Promise<User> | Promise<Error>
   */
  async deleteUserByUsername(username: string): Promise<User | Error> {
    try {
      const user = await this.userModel.findOneAndDelete({ username });
      if (!user) {
        throw new CustomException('User not found', CustomHttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new CustomException(
        'Internal server error',
        CustomHttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
