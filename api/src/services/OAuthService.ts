import { getCustomRepository } from 'typeorm';

import Bcryptjs from '../infra/bcryptjs/bcryptjs';
import JWT from '../infra/jwt/JWT';

import { UsersRepository } from '../repositories/UsersRepositories';
import { AuthenticateResponseType } from '../types/response/AuthenticateResponseType';

export interface IOAuthService {
  handleAuthenticate: ({ email, password }) => Promise<AuthenticateResponseType>;
}

export class OAuthService implements IOAuthService {

  private repository: UsersRepository;
  private bcryptjs: typeof Bcryptjs;
  private jwt: typeof JWT;

  constructor(repository = getCustomRepository(UsersRepository), bcryptjsModule = Bcryptjs, jwtSignModule = JWT) {
    this.repository = repository;
    this.bcryptjs = bcryptjsModule;
    this.jwt = jwtSignModule;
  }

  async handleAuthenticate({ email, password }): Promise<AuthenticateResponseType> {
    const user = await this.findOneByEmail({ email });

    if (!Boolean(user)) {
      throw new Error('User not found');
    };

    const isValidPassword = await this.validatePassword(password, user.password);
    if (!Boolean(isValidPassword)) {
      throw new Error('Incorrect password');
    }

    const token = this.jwt().sign({
      id: user.id,
      email: user.email,
    }, process.env.SECRET, { expiresIn: '1d' });

    delete user.password;
    return { user, token };
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
   * @param actPassword 
   * @param expPassword 
   */
  private async validatePassword(actPassword: string, expPassword: string) {
    return await this.bcryptjs().compare(actPassword, expPassword);
  }

}
