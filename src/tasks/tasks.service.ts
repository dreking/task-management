import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  private generateId(): string {
    return uuidv4();
  }

  addTask(title: string, description: string): Task {
    const task: Task = {
      id: this.generateId(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }
}
