import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, BadRequestException, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UseGuards } from '@nestjs/common'
import { PaginationDto } from '../pagination/dto/pagination.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

/**
 * Create a new task
 * @param dto CreateTaskDto
 * @returns Task
 */
  @Post('create-post')
  async createPost(@Body() dto: CreateTaskDto) {
    try {
  const task = await this.taskService.createTask(dto);
  return { message: 'Task Created', task };
  } catch (error) {
    if (error instanceof NotFoundException) throw error;
    throw new BadRequestException(error.message || 'Failed to create task');
  }
}

/**
 * Get all tasks
 * @param paginationDto PaginationDto
 * @returns { tasks: Task[]; total: number; page: number; limit: number; totalPages: number }
 */
  @Get('all')
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const tasks = await this.taskService.findAll(paginationDto);
      return { message: 'Tasks fetched successfully', data: tasks };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to fetch tasks');
    }
  }

  /**
   * Update a task
   * @param id string
   * @returns Task with status COMPLETED
   */
  @Patch(':id')
  async update(@Param('id') id: string) {
    try {
      const task = await this.taskService.updateTask(id);
      return { message: 'Task completed successfully', data: task };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message || 'Failed to update task');
    }
  }

}
