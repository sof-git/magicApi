import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { MockAuthGuard } from '../auth/MockAuthGuard';
import { getModelToken } from '@nestjs/mongoose';
import { UserDto } from './user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let authService: AuthService;
  let accessToken: string;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        AuthService,
        {
          provide: AuthGuard,
          useClass: MockAuthGuard, // Use the mocked AuthGuard
        },
        JwtService,
        {
          provide: AuthService,
          useValue: {
            signIn: async () => ({ access_token: 'mockAccessToken' }),
          },
        },
        {
          provide: getModelToken('User'), // Use getModelToken to get the token for UserModel
          useValue: {
            // Mock UserModel methods as needed for UserService
            // Example: findOne, create, update, etc.
            findOne: jest.fn().mockResolvedValue({}), // Mock findOne method
            create: jest.fn().mockResolvedValue({}), // Mock create method
            // Add more mock methods as needed
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    authService = moduleRef.get<AuthService>(AuthService);

    // Sign in and obtain access token before running other tests
    const signInResponse = await authService.signIn('admin', 'password');
    console.log(signInResponse);
    accessToken = signInResponse.access_token;
  });

  describe('Authentication', () => {
    it('should sign in and return an access token', async () => {
      expect(accessToken).toBeDefined();
    });
  });

  describe('find all users', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          username: 'John',
          email: 'John@example.com',
          role: 'admin',
          password: 'password',
        },
      ];

      jest.spyOn(userService, 'findAllUsers').mockResolvedValue(result);

      expect(await userController.findAllUsers()).toEqual(result);
    });
  });

  describe('Create a new user', () => {
    it('should create a new user', async () => {
      const userDto: UserDto = {
        username: 'John',
        email: 'azdcom',
        role: 'player',
        password: 'password',
      };

      jest.spyOn(userService, 'createUser').mockResolvedValue(userDto);

      expect(await userController.createUser(userDto)).toEqual(userDto);
    });
  });
});
