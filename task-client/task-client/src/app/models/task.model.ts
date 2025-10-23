export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface TaskResponse {
  message: string;
  task: Task;
}

export interface TasksResponse {
  message: string;
  data: {
    tasks: Task[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
