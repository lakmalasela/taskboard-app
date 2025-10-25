import { Task } from './task.entity';
import { Status } from '../../shared/enum/status.enum';

describe('Task Entity', () => {
  it('should be defined', () => {
    expect(Task).toBeDefined();
  });

  it('should create a task instance', () => {
    const task = new Task();
    task.id = 'test-id';
    task.title = 'Test Task';
    task.description = 'Test Description';
    task.status = Status.PENDING;
    task.created_at = new Date();
    task.updated_at = new Date();

    expect(task.id).toBe('test-id');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test Description');
    expect(task.status).toBe(Status.PENDING);
    expect(task.created_at).toBeInstanceOf(Date);
    expect(task.updated_at).toBeInstanceOf(Date);
  });

  it('should have all required properties', () => {
    const task = new Task();
    
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title');
    expect(task).toHaveProperty('description');
    expect(task).toHaveProperty('status');
    expect(task).toHaveProperty('created_at');
    expect(task).toHaveProperty('updated_at');
  });

  it('should allow status to be any valid Status enum value', () => {
    const task = new Task();
    
    task.status = Status.PENDING;
    expect(task.status).toBe(Status.PENDING);
    
    task.status = Status.INPROGRESS;
    expect(task.status).toBe(Status.INPROGRESS);
    
    task.status = Status.COMPLETED;
    expect(task.status).toBe(Status.COMPLETED);
    
    task.status = Status.OVERDUE;
    expect(task.status).toBe(Status.OVERDUE);
    
    task.status = Status.DELETED;
    expect(task.status).toBe(Status.DELETED);
  });

  it('should handle date properties correctly', () => {
    const task = new Task();
    const now = new Date();
    
    task.created_at = now;
    task.updated_at = now;
    
    expect(task.created_at).toBe(now);
    expect(task.updated_at).toBe(now);
  });
});
