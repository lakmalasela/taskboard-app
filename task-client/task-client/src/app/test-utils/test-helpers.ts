import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../services/task.service';
import { Task, CreateTaskDto, TasksResponse, TaskResponse } from '../models/task.model';

/**
 * Test helper functions for creating mock services and data
 */
export class TestHelpers {
  /**
   * Creates a mock TaskService with spy methods
   */
  static createMockTaskService(): jasmine.SpyObj<TaskService> {
    return jasmine.createSpyObj('TaskService', ['getAllTasks', 'createTask', 'updateTask']);
  }

  /**
   * Creates a mock ToastrService with spy methods
   */
  static createMockToastrService(): jasmine.SpyObj<ToastrService> {
    return jasmine.createSpyObj('ToastrService', ['success', 'error', 'info', 'warning']);
  }

  /**
   * Creates a mock task for testing
   */
  static createMockTask(overrides: Partial<Task> = {}): Task {
    return {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'Pending',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      ...overrides
    };
  }

  /**
   * Creates a mock CreateTaskDto for testing
   */
  static createMockCreateTaskDto(overrides: Partial<CreateTaskDto> = {}): CreateTaskDto {
    return {
      title: 'Test Task',
      description: 'Test Description',
      ...overrides
    };
  }

  /**
   * Creates a mock TasksResponse for testing
   */
  static createMockTasksResponse(tasks: Task[] = []): TasksResponse {
    return {
      message: 'Tasks retrieved successfully',
      data: {
        tasks: tasks.length > 0 ? tasks : [this.createMockTask()],
        total: tasks.length > 0 ? tasks.length : 1,
        page: 1,
        limit: 10,
        totalPages: 1
      }
    };
  }

  /**
   * Creates a mock TaskResponse for testing
   */
  static createMockTaskResponse(task: Task = this.createMockTask()): TaskResponse {
    return {
      message: 'Task operation successful',
      task
    };
  }

  /**
   * Sets up common test providers
   */
  static setupTestProviders() {
    return [
      { provide: TaskService, useValue: this.createMockTaskService() },
      { provide: ToastrService, useValue: this.createMockToastrService() }
    ];
  }

  /**
   * Creates multiple mock tasks for testing
   */
  static createMockTasks(count: number): Task[] {
    return Array.from({ length: count }, (_, index) => 
      this.createMockTask({
        id: `${index + 1}`,
        title: `Test Task ${index + 1}`,
        description: `Test Description ${index + 1}`,
        status: index % 2 === 0 ? 'Pending' : 'Completed'
      })
    );
  }
}
