import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export class UsersRepository extends Repository<User> {}
