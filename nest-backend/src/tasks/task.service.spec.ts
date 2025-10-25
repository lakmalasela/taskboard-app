import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { Status } from '../shared/enum/status.enum';
import { NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<Task>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
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

      mockRepository.create.mockReturnValue(expectedTask);
      mockRepository.save.mockResolvedValue(expectedTask);

      const result = await service.createTask(createTaskDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: Status.PENDING,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(expectedTask);
      expect(result).toEqual(expectedTask);
    });

    it('should throw BadRequestException when repository save fails', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const expectedTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: Status.PENDING,
      };

      mockRepository.create.mockReturnValue(expectedTask);
      mockRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(service.createTask(createTaskDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when repository throws NotFoundException', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const expectedTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: Status.PENDING,
      };

      mockRepository.create.mockReturnValue(expectedTask);
      mockRepository.save.mockRejectedValue(new NotFoundException('Not found'));

      await expect(service.createTask(createTaskDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const taskId = 'test-id';
      const existingTask = {
        id: taskId,
        title: 'Test Task',
        description: 'Test Description',
        status: Status.PENDING,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const updatedTask = {
        ...existingTask,
        status: Status.COMPLETED,
        updated_at: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(existingTask);
      mockRepository.save.mockResolvedValue(updatedTask);

      const result = await service.updateTask(taskId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: taskId } });
      expect(mockRepository.save).toHaveBeenCalledWith({
        ...existingTask,
        status: Status.COMPLETED,
        updated_at: expect.any(Date),
      });
      expect(result).toEqual(updatedTask);
    });

    it('should throw NotFoundException when task is not found', async () => {
      const taskId = 'non-existent-id';

      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.updateTask(taskId)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: taskId } });
    });

    it('should throw BadRequestException when repository save fails', async () => {
      const taskId = 'test-id';
      const existingTask = {
        id: taskId,
        title: 'Test Task',
        description: 'Test Description',
        status: Status.PENDING,
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(existingTask);
      mockRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(service.updateTask(taskId)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when repository throws NotFoundException', async () => {
      const taskId = 'test-id';

      mockRepository.findOne.mockRejectedValue(new NotFoundException('Not found'));

      await expect(service.updateTask(taskId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return tasks without search filter', async () => {
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

      mockRepository.find.mockResolvedValue(mockTasks);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { status: expect.any(Object) },
        order: { created_at: 'DESC' },
      });
      expect(result.tasks).toEqual(mockTasks.slice(0, 5));
      expect(result.total).toBe(mockTasks.length);
    });

    it('should return tasks with search filter', async () => {
      const paginationDto: PaginationDto = {
        search: 'test',
      };

      const mockTasks = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Description 1',
          status: Status.PENDING,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockRepository.find.mockResolvedValue(mockTasks);

      const result = await service.findAll(paginationDto);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: [
          { status: expect.any(Object), title: expect.any(Object) },
          { status: expect.any(Object), description: expect.any(Object) },
        ],
        order: { created_at: 'DESC' },
      });
      expect(result.tasks).toEqual(mockTasks.slice(0, 5));
      expect(result.total).toBe(mockTasks.length);
    });

    it('should return only the last 5 tasks', async () => {
      const mockTasks = Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        title: `Task ${i + 1}`,
        description: `Description ${i + 1}`,
        status: Status.PENDING,
        created_at: new Date(),
        updated_at: new Date(),
      }));

      mockRepository.find.mockResolvedValue(mockTasks);

      const result = await service.findAll();

      expect(result.tasks).toHaveLength(5);
      expect(result.total).toBe(10);
    });

    it('should throw InternalServerErrorException when repository find fails', async () => {
      mockRepository.find.mockRejectedValue(new Error('Database error'));

      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });
});
