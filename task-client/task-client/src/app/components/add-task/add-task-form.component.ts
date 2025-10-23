import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateTaskDto } from '../../models/task.model';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent {
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() addTask = new EventEmitter<CreateTaskDto>();
  @Output() clearError = new EventEmitter<void>();

  newTask: CreateTaskDto = {
    title: '',
    description: ''
  };

  constructor(private toastr: ToastrService) {}

  onSubmit(): void {
    if (!this.newTask.title.trim() || !this.newTask.description.trim()) {
      this.toastr.error('Please fill in both title and description', 'Validation Error');
      return;
    }
    
    this.addTask.emit(this.newTask);
    this.newTask = { title: '', description: '' };
  }

  onFocus(): void {
    this.clearError.emit();
  }
}
