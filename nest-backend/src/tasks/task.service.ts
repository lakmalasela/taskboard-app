import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, ILike } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto'; 
import { UpdateTaskDto } from './dto/update-task.dto';
import { Status } from '../shared/enum/status.enum';

import { PaginationDto } from '../pagination/dto/pagination.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) 
    private readonly taskRepository: Repository<Task>,
  ) {}

  /**
   * Create a new task
   * @param createTaskDto CreateTaskDto
   * @returns Task
   */

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const task = this.taskRepository.create({
     
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: Status.PENDING,
      });
      return await this.taskRepository.save(task);
    
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message || 'Failed to create task');
    }
  }


  /**
   * Update a task
   * @param id string
   * @returns Task with status COMPLETED
   */

  async updateTask(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      if (!task) throw new NotFoundException(`Task with id ${id} not found`);
      task.status = Status.COMPLETED;
      task.updated_at = new Date();
      return await this.taskRepository.save(task);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message || 'Failed to update task');
    }
  }

  /**
   * Get all tasks
   * @param paginationDto PaginationDto
   * @returns { tasks: Task[]; total: number; page: number; limit: number; totalPages: number }
   */

  async findAll(
    paginationDto?: PaginationDto,
  ): Promise<{ tasks: Task[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const { page = 1, limit = 5, search } = paginationDto || {};
      const skip = (page - 1) * limit;
  
      let whereCondition: any;
  
      if (search) {
        // Search by title OR description
        whereCondition = [
          { status: Not(Status.COMPLETED), title: ILike(`%${search}%`) },
          { status: Not(Status.COMPLETED), description: ILike(`%${search}%`) },
        ];
      } else {
        whereCondition = { status: Not(Status.COMPLETED) };
      }
  
      const [tasks, total] = await this.taskRepository.findAndCount({
        skip,
        take: limit,
        order: { created_at: 'DESC' },
        where: whereCondition,
      });
  
      const totalPages = Math.ceil(total / limit);
  
      return {
        tasks,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

}
