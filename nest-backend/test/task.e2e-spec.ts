import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../src/tasks/entities/task.entity';
import { Status } from '../src/shared/enum/status.enum';

describe('TaskController (e2e)', () => {
  let app: INestApplication<App>;
  let taskRepository: Repository<Task>;

  const mockTaskRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Task))
      .useValue(mockTaskRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    taskRepository = moduleFixture.get<Repository<Task>>(getRepositoryToken(Task));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /task/create-post', () => {
    it('should create a new task successfully', async () => {
      const createTaskDto = {
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

      mockTaskRepository.create.mockReturnValue(expectedTask);
      mockTaskRepository.save.mockResolvedValue(expectedTask);

      const response = await request(app.getHttpServer())
        .post('/task/create-post')
        .send(createTaskDto)
        .expect(201);

      expect(response.body).toEqual({
        message: 'Task Created',
        task: expectedTask,
      });
      expect(mockTaskRepository.create).toHaveBeenCalledWith({
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: Status.PENDING,
      });
      expect(mockTaskRepository.save).toHaveBeenCalledWith(expectedTask);
    });

    it('should return 400 when title is missing', async () => {
      const createTaskDto = {
        description: 'Test Description',
      };

      await request(app.getHttpServer())
        .post('/task/create-post')
        .send(createTaskDto)
        .expect(400);
    });

    it('should return 400 when description is missing', async () => {
      const createTaskDto = {
        title: 'Test Task',
      };

      await request(app.getHttpServer())
        .post('/task/create-post')
        .send(createTaskDto)
        .expect(400);
    });

    it('should return 400 when repository save fails', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const expectedTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: Status.PENDING,
      };

      mockTaskRepository.create.mockReturnValue(expectedTask);
      mockTaskRepository.save.mockRejectedValue(new Error('Database error'));

      await request(app.getHttpServer())
        .post('/task/create-post')
        .send(createTaskDto)
        .expect(400);
    });
  });

  describe('GET /task/all', () => {
    it('should return all tasks successfully', async () => {
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

      mockTaskRepository.find.mockResolvedValue(mockTasks);

      const response = await request(app.getHttpServer())
        .get('/task/all')
        .expect(200);

      expect(response.body).toEqual({
        message: 'Tasks fetched successfully',
        data: {
          tasks: mockTasks.slice(0, 5),
          total: mockTasks.length,
        },
      });
      expect(mockTaskRepository.find).toHaveBeenCalled();
    });

    it('should return tasks with search filter', async () => {
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

      mockTaskRepository.find.mockResolvedValue(mockTasks);

      const response = await request(app.getHttpServer())
        .get('/task/all?search=test')
        .expect(200);

      expect(response.body).toEqual({
        message: 'Tasks fetched successfully',
        data: {
          tasks: mockTasks.slice(0, 5),
          total: mockTasks.length,
        },
      });
    });

    it('should return 400 when repository find fails', async () => {
      mockTaskRepository.find.mockRejectedValue(new Error('Database error'));

      await request(app.getHttpServer())
        .get('/task/all')
        .expect(400);
    });
  });

  describe('PATCH /task/:id', () => {
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

      mockTaskRepository.findOne.mockResolvedValue(existingTask);
      mockTaskRepository.save.mockResolvedValue(updatedTask);

      const response = await request(app.getHttpServer())
        .patch(`/task/${taskId}`)
        .expect(200);

      expect(response.body).toEqual({
        message: 'Task completed successfully',
        data: updatedTask,
      });
      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({ where: { id: taskId } });
      expect(mockTaskRepository.save).toHaveBeenCalledWith({
        ...existingTask,
        status: Status.COMPLETED,
        updated_at: expect.any(Date),
      });
    });

    it('should return 404 when task is not found', async () => {
      const taskId = 'non-existent-id';

      mockTaskRepository.findOne.mockResolvedValue(null);

      await request(app.getHttpServer())
        .patch(`/task/${taskId}`)
        .expect(404);
    });

    it('should return 400 when repository save fails', async () => {
      const taskId = 'test-id';
      const existingTask = {
        id: taskId,
        title: 'Test Task',
        description: 'Test Description',
        status: Status.PENDING,
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockTaskRepository.findOne.mockResolvedValue(existingTask);
      mockTaskRepository.save.mockRejectedValue(new Error('Database error'));

      await request(app.getHttpServer())
        .patch(`/task/${taskId}`)
        .expect(400);
    });
  });

  describe('GET /', () => {
    it('should return Hello World!', async () => {
      const response = await request(app.getHttpServer())
        .get('/')
        .expect(200);

      expect(response.text).toBe('Hello World!');
    });
  });
});
