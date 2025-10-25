import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddTaskFormComponent } from './add-task-form.component';
import { CreateTaskDto } from '../../models/task.model';

describe('AddTaskFormComponent', () => {
  let component: AddTaskFormComponent;
  let fixture: ComponentFixture<AddTaskFormComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    await TestBed.configureTestingModule({
      imports: [AddTaskFormComponent, FormsModule],
      providers: [
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskFormComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as unknown as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty task', () => {
    expect(component.newTask).toEqual({ title: '', description: '' });
  });

  it('should initialize with default input values', () => {
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      spyOn(component.addTask, 'emit');
    });

    it('should emit addTask event with valid data', () => {
      const taskData: CreateTaskDto = { title: 'Test Task', description: 'Test Description' };
      component.newTask = taskData;

      component.onSubmit();

      expect(component.addTask.emit).toHaveBeenCalledWith(taskData);
      expect(component.newTask).toEqual({ title: '', description: '' });
    });

    it('should not emit addTask event when title is empty', () => {
      component.newTask = { title: '', description: 'Test Description' };

      component.onSubmit();

      expect(component.addTask.emit).not.toHaveBeenCalled();
      expect(toastrService.error).toHaveBeenCalledWith('Please fill in both title and description', 'Validation Error');
    });

    it('should not emit addTask event when description is empty', () => {
      component.newTask = { title: 'Test Task', description: '' };

      component.onSubmit();

      expect(component.addTask.emit).not.toHaveBeenCalled();
      expect(toastrService.error).toHaveBeenCalledWith('Please fill in both title and description', 'Validation Error');
    });

    it('should not emit addTask event when title is only whitespace', () => {
      component.newTask = { title: '   ', description: 'Test Description' };

      component.onSubmit();

      expect(component.addTask.emit).not.toHaveBeenCalled();
      expect(toastrService.error).toHaveBeenCalledWith('Please fill in both title and description', 'Validation Error');
    });

    it('should not emit addTask event when description is only whitespace', () => {
      component.newTask = { title: 'Test Task', description: '   ' };

      component.onSubmit();

      expect(component.addTask.emit).not.toHaveBeenCalled();
      expect(toastrService.error).toHaveBeenCalledWith('Please fill in both title and description', 'Validation Error');
    });

    it('should not emit addTask event when both fields are only whitespace', () => {
      component.newTask = { title: '   ', description: '   ' };

      component.onSubmit();

      expect(component.addTask.emit).not.toHaveBeenCalled();
      expect(toastrService.error).toHaveBeenCalledWith('Please fill in both title and description', 'Validation Error');
    });
  });

  describe('onFocus', () => {
    it('should emit clearError event', () => {
      spyOn(component.clearError, 'emit');

      component.onFocus();

      expect(component.clearError.emit).toHaveBeenCalled();
    });
  });

  describe('Input properties', () => {
    it('should accept loading input', () => {
      component.loading = true;
      expect(component.loading).toBeTrue();
    });

    it('should accept error input', () => {
      const errorMessage = 'Test error';
      component.error = errorMessage;
      expect(component.error).toBe(errorMessage);
    });
  });

  describe('Output events', () => {
    it('should have addTask output', () => {
      expect(component.addTask).toBeDefined();
      expect(component.addTask.emit).toBeDefined();
    });

    it('should have clearError output', () => {
      expect(component.clearError).toBeDefined();
      expect(component.clearError.emit).toBeDefined();
    });
  });
});
