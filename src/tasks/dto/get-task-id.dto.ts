import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetTaskIdDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'Id is invalid' })
  id: string;
}
