import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockAppService = {
    getHello: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const expectedMessage = 'Hello World!';
      mockAppService.getHello.mockReturnValue(expectedMessage);

      const result = appController.getHello();

      expect(mockAppService.getHello).toHaveBeenCalled();
      expect(result).toBe(expectedMessage);
    });

    it('should call service getHello method', () => {
      const expectedMessage = 'Hello World!';
      mockAppService.getHello.mockReturnValue(expectedMessage);

      appController.getHello();

      expect(mockAppService.getHello).toHaveBeenCalledTimes(1);
    });
  });
});
