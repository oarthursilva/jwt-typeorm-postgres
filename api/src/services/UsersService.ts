import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepositories';
import Users from '../models/entities/Users';

interface ICreate {
  email: string;
  password: string;
}

interface IUsersService {
  handleCreate: ({ email, password }) => Promise<Users>;
}

class UsersService implements IUsersService {

  private repository: UsersRepository;

  constructor(repository = getCustomRepository(UsersRepository)) {
    this.repository = repository;
  }

  /**
   * 
   * @param params
   * @returns 
   */
  async handleCreate({ email, password }: ICreate) {
    let user = await this.findOneByEmail({ email });

    if (Boolean(user)) {
      throw new Error('Resource already exist');
    }

    user = await this.createUser({ email, password });
    return user;
  }

  /**
   * 
   * @param params
   * @returns 
   */
  private async findOneByEmail({ email }) {
    const user = await this.repository.findOne({
      where: { email }
    });
    return user;
  }

  /**
   * 
   * @param params
   * @returns 
   */
  private async createUser({ ...params }) {
    const user = this.repository.create({ ...params });
    await this.repository.save(user);

    return user;
  }
}

export default UsersService;
export { IUsersService };
