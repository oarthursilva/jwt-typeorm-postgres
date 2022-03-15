import { EntityRepository, Repository } from 'typeorm';
import Users from '../models/entities/Users';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> { };
