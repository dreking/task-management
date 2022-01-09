import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { BcryptService } from './utils/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), BcryptService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
