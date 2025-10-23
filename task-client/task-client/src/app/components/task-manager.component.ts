import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../services/task.service';
import { Task, CreateTaskDto } from '../models/task.model';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  newTask: CreateTaskDto = {
    title: '',
    description: ''
  };
  loading = false;
  error: string | null = null;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    // Add some sample data for demonstration
    // this.addSampleTasks();
  }

  addSampleTasks(): void {
    this.tasks = [
      {
        id: '1',
        title: 'Buy books',
        description: 'Buy books for the next school year',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Clean home',
        description: 'Need to clean the bed room',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        title: 'Takehome assignment',
        description: 'Finish the mid-term assignment',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        title: 'Play Cricket',
        description: 'Plan the soft ball cricket match on next Sunday',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        title: 'Help Saman',
        description: 'Saman need help with his software project',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  loadTasks(): void {
    this.loading = true;
    this.error = null;
    
    this.taskService.getAllTasks({ page: 1, limit: 10 }).subscribe({
      next: (response) => {
        this.tasks = response.data.tasks;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load tasks';
        this.loading = false;
        this.toastr.error('Failed to load tasks', 'Error');
        console.error('Error loading tasks:', error);
      }
    });
  }

  addTask(): void {
    if (!this.newTask.title.trim() || !this.newTask.description.trim()) {
      this.toastr.error('Please fill in both title and description', 'Validation Error');
      return;
    }

    this.loading = true;
    this.error = null;

    this.taskService.createTask(this.newTask).subscribe({
      next: (response) => {
        this.tasks.unshift(response.task);
        this.newTask = { title: '', description: '' };
        this.loading = false;
        this.toastr.success('Task created successfully!', 'Success');
      },
      error: (error) => {
        this.error = 'Failed to create task';
        this.loading = false;
        const errorMessage = error.error?.message || 'Failed to create task';
        this.toastr.error(errorMessage, 'Error');
        console.error('Error creating task:', error);
      }
    });
  }

  markAsDone(taskId: string): void {
    this.loading = true;
    this.error = null;

    this.taskService.updateTask(taskId).subscribe({
      next: (response) => {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = response.task;
        }
        this.loading = false;
        this.toastr.success('Task marked as completed!', 'Success');
      },
      error: (error) => {
        this.error = 'Failed to update task';
        this.loading = false;
        const errorMessage = error.error?.message || 'Failed to update task';
        this.toastr.error(errorMessage, 'Error');
        console.error('Error updating task:', error);
      }
    });
  }

  clearError(): void {
    this.error = null;
  }
}