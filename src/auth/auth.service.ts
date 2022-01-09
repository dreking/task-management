import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './user.repository';

import { BcryptService } from './utils/bcrypt.service';
const bcryptService = new BcryptService();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.createUser(authCredentials);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    const { username, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcryptService.comparePassword(
      password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: user.username, id: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
