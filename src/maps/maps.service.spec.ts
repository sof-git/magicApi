import { Test, TestingModule } from '@nestjs/testing';
import { MapService } from './maps.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { MockAuthGuard } from '../auth/MockAuthGuard';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { MapController } from './maps.controller';

describe('MapsService', () => {
  let mapService: MapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapController],
      providers: [
        MapService,
        AuthService,
        {
          provide: AuthGuard,
          useClass: MockAuthGuard,
        },
        JwtService,
        {
          provide: AuthService,
          useValue: {
            signIn: async () => ({ access_token: 'mockAccessToken' }),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    mapService = module.get<MapService>(MapService);
  });

  it('should be defined', () => {
    expect(mapService).toBeDefined();
  });

  describe('Create a new map', () => {
    it('should create a new map', async () => {
      const map = {
        name: 'Test Map',
        description: 'This is a test map',
        theme: 'forest',
        background: {
          src: 'forest.jpg',
          type: 'image/jpg',
        },
      };
      jest.spyOn(mapService, 'createMap').mockResolvedValue(map);
    });
  });
});
