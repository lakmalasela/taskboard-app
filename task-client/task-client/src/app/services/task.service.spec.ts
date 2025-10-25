import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { CreateTaskDto, Task, TaskResponse, TasksResponse } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  };

  const mockTasksResponse: TasksResponse = {
    message: 'Tasks retrieved successfully',
    data: {
      tasks: [mockTask],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1
    }
  };

  const mockTaskResponse: TaskResponse = {
    message: 'Task created successfully',
    task: mockTask
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createTask', () => {
    it('should create a task successfully', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description'
      };

      service.createTask(createTaskDto).subscribe(response => {
        expect(response).toEqual(mockTaskResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/create-post`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(createTaskDto);
      req.flush(mockTaskResponse);
    });

    it('should handle error when creating task fails', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description'
      };
      const errorMessage = 'Validation failed';

      service.createTask(createTaskDto).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.error.message).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/create-post`);
      req.flush({ message: errorMessage }, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('getAllTasks', () => {
    it('should get all tasks with default pagination', () => {
      service.getAllTasks().subscribe(response => {
        expect(response).toEqual(mockTasksResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/all`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasksResponse);
    });

    it('should get all tasks with custom pagination', () => {
      const paginationDto = { page: 2, limit: 5 };

      service.getAllTasks(paginationDto).subscribe(response => {
        expect(response).toEqual(mockTasksResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/all`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasksResponse);
    });

    it('should handle error when getting tasks fails', () => {
      const errorMessage = 'Server error';

      service.getAllTasks().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.error.message).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/all`);
      req.flush({ message: errorMessage }, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', () => {
      const taskId = '1';
      const updatedTask = { ...mockTask, status: 'Completed' as const };
      const updatedResponse: TaskResponse = {
        message: 'Task updated successfully',
        task: updatedTask
      };

      service.updateTask(taskId).subscribe(response => {
        expect(response).toEqual(updatedResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${taskId}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({});
      req.flush(updatedResponse);
    });

    it('should handle error when updating task fails', () => {
      const taskId = '999';
      const errorMessage = 'Task not found';

      service.updateTask(taskId).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.error.message).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${taskId}`);
      req.flush({ message: errorMessage }, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('API URL configuration', () => {
    it('should use correct API URL', () => {
      expect(service['apiUrl']).toContain('/task');
    });
  });
});
