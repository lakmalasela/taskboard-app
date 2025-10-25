import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TaskManagerComponent } from './task-manager.component';
import { TaskService } from '../services/task.service';
import { Task, CreateTaskDto, TasksResponse, TaskResponse } from '../models/task.model';

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;
  let taskService: any;
  let toastrService: any;

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Test Task 1',
      description: 'Test Description 1',
      status: 'Pending',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      title: 'Test Task 2',
      description: 'Test Description 2',
      status: 'Completed',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ];

  const mockTasksResponse: TasksResponse = {
    message: 'Tasks retrieved successfully',
    data: {
      tasks: mockTasks,
      total: 2,
      page: 1,
      limit: 10,
      totalPages: 1
    }
  };

  const mockTaskResponse: TaskResponse = {
    message: 'Task created successfully',
    task: {
      id: '3',
      title: 'New Task',
      description: 'New Description',
      status: 'Pending',
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    }
  };

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getAllTasks', 'createTask', 'updateTask']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error', 'info']);

    await TestBed.configureTestingModule({
      imports: [TaskManagerComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as any;
    toastrService = TestBed.inject(ToastrService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadTasks on init', () => {
      spyOn(component, 'loadTasks');
      component.ngOnInit();
      expect(component.loadTasks).toHaveBeenCalled();
    });
  });

  describe('loadTasks', () => {
    it('should load tasks successfully', () => {
      taskService.getAllTasks.and.returnValue(of(mockTasksResponse));

      component.loadTasks();

      expect(component.loading).toBeFalse();
      expect(component.error).toBeNull();
      expect(component.tasks).toEqual(mockTasks);
      expect(taskService.getAllTasks).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });

    it('should handle error when loading tasks fails', () => {
      const error = new Error('Network error');
      taskService.getAllTasks.and.returnValue(throwError(() => error));

      component.loadTasks();

      expect(component.loading).toBeFalse();
      expect(component.error).toBe('Failed to load tasks');
      expect(toastrService.error).toHaveBeenCalledWith('Failed to load tasks', 'Error');
    });
  });

  describe('addTask', () => {
    beforeEach(() => {
      spyOn(window, 'confirm').and.returnValue(true);
    });

    it('should add task successfully when user confirms', () => {
      const newTask: CreateTaskDto = { title: 'New Task', description: 'New Description' };
      taskService.createTask.and.returnValue(of(mockTaskResponse));

      component.addTask(newTask);

      expect(component.tasks[0]).toEqual(mockTaskResponse.task);
      expect(component.loading).toBeFalse();
      expect(toastrService.success).toHaveBeenCalledWith('Task created successfully!', 'Success');
    });

    it('should not add task when user cancels confirmation', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      const newTask: CreateTaskDto = { title: 'New Task', description: 'New Description' };

      component.addTask(newTask);

      expect(taskService.createTask).not.toHaveBeenCalled();
      expect(toastrService.info).toHaveBeenCalledWith('Task creation cancelled', 'Info');
    });

    it('should handle error when creating task fails', () => {
      const newTask: CreateTaskDto = { title: 'New Task', description: 'New Description' };
      const error = { error: { message: 'Validation failed' } };
      taskService.createTask.and.returnValue(throwError(() => error));

      component.addTask(newTask);

      expect(component.loading).toBeFalse();
      expect(component.error).toBe('Failed to create task');
      expect(toastrService.error).toHaveBeenCalledWith('Validation failed', 'Error');
    });
  });

  describe('markAsDone', () => {
    beforeEach(() => {
      component.tasks = [...mockTasks];
      spyOn(window, 'confirm').and.returnValue(true);
    });

    it('should mark task as done successfully when user confirms', () => {
      const updatedTask = { ...mockTasks[0], status: 'Completed' as const };
      const updatedResponse: TaskResponse = {
        message: 'Task updated successfully',
        task: updatedTask
      };
      taskService.updateTask.and.returnValue(of(updatedResponse));

      component.markAsDone('1');

      expect(component.tasks[0]).toEqual(updatedTask);
      expect(component.loading).toBeFalse();
      expect(toastrService.success).toHaveBeenCalledWith('Task marked as completed!', 'Success');
    });

    it('should not mark task as done when user cancels confirmation', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.markAsDone('1');

      expect(taskService.updateTask).not.toHaveBeenCalled();
      expect(toastrService.info).toHaveBeenCalledWith('Task completion cancelled', 'Info');
    });

    it('should handle error when updating task fails', () => {
      const error = { error: { message: 'Task not found' } };
      taskService.updateTask.and.returnValue(throwError(() => error));

      component.markAsDone('1');

      expect(component.loading).toBeFalse();
      expect(component.error).toBe('Failed to update task');
      expect(toastrService.error).toHaveBeenCalledWith('Task not found', 'Error');
    });
  });

  describe('clearError', () => {
    it('should clear error', () => {
      component.error = 'Some error';
      component.clearError();
      expect(component.error).toBeNull();
    });
  });
});
