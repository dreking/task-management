import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskIdDto } from './dto/get-task-id.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');

  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @GetUser() user: User,
    @Query() filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.taskService.getTasks(filterDto, user);
  }

  @Post()
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );

    return this.taskService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  getTaskById(
    @GetUser() user: User,
    @Param() getTaskIdDto: GetTaskIdDto,
  ): Promise<Task> {
    const { id } = getTaskIdDto;

    return this.taskService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTask(
    @GetUser() user: User,
    @Param() getTaskIdDto: GetTaskIdDto,
  ): Promise<void> {
    const { id } = getTaskIdDto;
    return this.taskService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @GetUser() user: User,
    @Param() getTaskIdDto: GetTaskIdDto,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { id } = getTaskIdDto;
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
