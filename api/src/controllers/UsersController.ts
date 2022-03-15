import { Request, Response } from 'express';
import UsersService, { IUsersService } from '../services/UsersService';

class UsersController {

  private usersService: IUsersService;

  constructor(usersService = new UsersService()) {
    this.usersService = usersService;
  }

  /**
   * 
   * @param request 
   * @param response 
   */
  async index(request: Request, response: Response) {
    const user = request.user;
    response.status(200).json(user);
  }

  /**
   * 
   * @param request 
   * @param response 
   */
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await this.usersService.handleCreate({ email, password });
      response.status(200).json(user);
    } catch (err) {
      response.sendStatus(409);
    }
  }

}

export default UsersController;
