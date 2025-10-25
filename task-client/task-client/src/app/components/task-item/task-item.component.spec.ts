import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../models/task.model';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default loading value', () => {
    expect(component.loading).toBeFalse();
  });

  it('should accept task input', () => {
    expect(component.task).toEqual(mockTask);
  });

  it('should accept loading input', () => {
    component.loading = true;
    expect(component.loading).toBeTrue();
  });

  describe('onMarkAsDone', () => {
    it('should emit markAsDone event with task id', () => {
      spyOn(component.markAsDone, 'emit');

      component.onMarkAsDone();

      expect(component.markAsDone.emit).toHaveBeenCalledWith(mockTask.id);
    });

    it('should emit markAsDone event with correct task id for different task', () => {
      const anotherTask: Task = {
        id: '2',
        title: 'Another Task',
        description: 'Another Description',
        status: 'Pending',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02')
      };
      component.task = anotherTask;
      spyOn(component.markAsDone, 'emit');

      component.onMarkAsDone();

      expect(component.markAsDone.emit).toHaveBeenCalledWith('2');
    });
  });

  describe('Input properties', () => {
    it('should accept task input', () => {
      const newTask: Task = {
        id: '3',
        title: 'New Task',
        description: 'New Description',
        status: 'Completed',
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03')
      };
      component.task = newTask;
      expect(component.task).toEqual(newTask);
    });

    it('should accept loading input', () => {
      component.loading = true;
      expect(component.loading).toBeTrue();
    });
  });

  describe('Output events', () => {
    it('should have markAsDone output', () => {
      expect(component.markAsDone).toBeDefined();
      expect(component.markAsDone.emit).toBeDefined();
    });
  });

  describe('Task status display', () => {
    it('should handle Pending status', () => {
      const pendingTask: Task = {
        ...mockTask,
        status: 'Pending'
      };
      component.task = pendingTask;
      expect(component.task.status).toBe('Pending');
    });

    it('should handle Completed status', () => {
      const completedTask: Task = {
        ...mockTask,
        status: 'Completed'
      };
      component.task = completedTask;
      expect(component.task.status).toBe('Completed');
    });
  });
});
