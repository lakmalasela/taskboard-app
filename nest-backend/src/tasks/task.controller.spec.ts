import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { Status } from '../shared/enum/status.enum';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    createTask: jest.fn(),
    updateTask: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a new task successfully', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const expectedTask = {
        id: 'test-id',
        title: 'Test Task',
        description: 'Test Description',
        status: Status.PENDING,
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockTaskService.createTask.mockResolvedValue(expectedTask);

      const result = await controller.createPost(createTaskDto);

      expect(mockTaskService.createTask).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual({
        message: 'Task Created',
        task: expectedTask,
      });
    });

    it('should throw NotFoundException when service throws NotFoundException', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      mockTaskService.createTask.mockRejectedValue(new NotFoundException('Task not found'));

      await expect(controller.createPost(createTaskDto)).rejects.toThrow(NotFoundException);
      expect(mockTaskService.createTask).toHaveBeenCalledWith(createTaskDto);
    });

    it('should throw BadRequestException when service throws other errors', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      mockTaskService.createTask.mockRejectedValue(new Error('Database error'));

      await expect(controller.createPost(createTaskDto)).rejects.toThrow(BadRequestException);
      expect(mockTaskService.createTask).toHaveBeenCalledWith(createTaskDto);
    });

    it('should throw BadRequestException with custom message when service throws error', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const error = new Error('Custom error message');
      mockTaskService.createTask.mockRejectedValue(error);

      await expect(controller.createPost(createTaskDto)).rejects.toThrow(BadRequestException);
      expect(mockTaskService.createTask).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return all tasks successfully', async () => {
      const paginationDto: PaginationDto = {
        search: 'test',
      };

      const mockTasks = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: Status.PENDING,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '2',
          title: 'Task 2',
          description: 'Description 2',
          status: Status.PENDING,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const serviceResponse = {
        tasks: mockTasks,
        total: 2,
      };

      mockTaskService.findAll.mockResolvedValue(serviceResponse);

      const result = await controller.findAll(paginationDto);

      expect(mockTaskService.findAll).toHaveBeenCalledWith(paginationDto);
      expect(result).toEqual({
        message: 'Tasks fetched successfully',
        data: serviceResponse,
      });
    });

    it('should return all tasks without pagination', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: Status.PENDING,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const serviceResponse = {
        tasks: mockTasks,
        total: 1,
      };

      mockTaskService.findAll.mockResolvedValue(serviceResponse);

      const result = await controller.findAll({});

      expect(mockTaskService.findAll).toHaveBeenCalledWith({});
      expect(result).toEqual({
        message: 'Tasks fetched successfully',
        data: serviceResponse,
      });
    });

    it('should throw BadRequestException when service throws error', async () => {
      const paginationDto: PaginationDto = {
        search: 'test',
      };

      mockTaskService.findAll.mockRejectedValue(new Error('Database error'));

      await expect(controller.findAll(paginationDto)).rejects.toThrow(BadRequestException);
      expect(mockTaskService.findAll).toHaveBeenCalledWith(paginationDto);
    });

    it('should throw BadRequestException with custom message when service throws error', async () => {
      const paginationDto: PaginationDto = {
        search: 'test',
      };

      const error = new Error('Custom error message');
      mockTaskService.findAll.mockRejectedValue(error);

      await expect(controller.findAll(paginationDto)).rejects.toThrow(BadRequestException);
      expect(mockTaskService.findAll).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('update', () => {
    it('should update a task successfully', async () => {
      const taskId = 'test-id';
      const updatedTask = {
        id: taskId,
        title: 'Updated Task',
        description: 'Updated Description',
        status: Status.COMPLETED,
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockTaskService.updateTask.mockResolvedValue(updatedTask);

      const result = await controller.update(taskId);

      expect(mockTaskService.updateTask).toHaveBeenCalledWith(taskId);
      expect(result).toEqual({
        message: 'Task completed successfully',
        data: updatedTask,
      });
    });

    it('should throw NotFoundException when service throws NotFoundException', async () => {
      const taskId = 'non-existent-id';

      mockTaskService.updateTask.mockRejectedValue(new NotFoundException('Task not found'));

      await expect(controller.update(taskId)).rejects.toThrow(NotFoundException);
      expect(mockTaskService.updateTask).toHaveBeenCalledWith(taskId);
    });

    it('should throw BadRequestException when service throws other errors', async () => {
      const taskId = 'test-id';

      mockTaskService.updateTask.mockRejectedValue(new Error('Database error'));

      await expect(controller.update(taskId)).rejects.toThrow(BadRequestException);
      expect(mockTaskService.updateTask).toHaveBeenCalledWith(taskId);
    });

    it('should throw BadRequestException with custom message when service throws error', async () => {
      const taskId = 'test-id';

      const error = new Error('Custom error message');
      mockTaskService.updateTask.mockRejectedValue(error);

      await expect(controller.update(taskId)).rejects.toThrow(BadRequestException);
      expect(mockTaskService.updateTask).toHaveBeenCalledWith(taskId);
    });
  });
});
