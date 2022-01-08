import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, { message: 'Status is invalid' })
  status: TaskStatus;
}
