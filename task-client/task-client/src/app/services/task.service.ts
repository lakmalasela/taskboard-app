import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskDto, PaginationDto, TaskResponse, TasksResponse } from '../models/task.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl+'/task'; 

  constructor(private http: HttpClient) {}

  /**
   * Create a new task
   * @param dto CreateTaskDto
   * @returns Observable<TaskResponse>
   */
  createTask(dto: CreateTaskDto): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(`${this.apiUrl}/create-post`, dto);
  }

  /**
   * Get all tasks with pagination
   * @param paginationDto PaginationDto
   * @returns Observable<TasksResponse>
   */
  getAllTasks(paginationDto: PaginationDto = {}): Observable<TasksResponse> {
    let params = new HttpParams();
    
    if (paginationDto.page) {
      params = params.set('page', paginationDto.page.toString());
    }
    
    if (paginationDto.limit) {
      params = params.set('limit', paginationDto.limit.toString());
    }

    return this.http.get<TasksResponse>(`${this.apiUrl}/all`);
  }

  /**
   * Update a task to completed status
   * @param id string
   * @returns Observable<TaskResponse>
   */
  updateTask(id: string): Observable<TaskResponse> {
    return this.http.patch<TaskResponse>(`${this.apiUrl}/${id}`, {});
  }
}
