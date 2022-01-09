import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status is invalid' })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
