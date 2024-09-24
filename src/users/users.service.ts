import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: UsersRepository,
  ) {}

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User not found!`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const userEmail = createUserDto.email;
    const existUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .select(['user.email'])
      .getOne();

    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }
}
