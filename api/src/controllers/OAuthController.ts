import { Request, Response } from 'express';
import { OAuthService } from '../services/OAuthService';

class OAuthController {
  private oAuthService: OAuthService;

  constructor(oAuthService = new OAuthService()) {
    this.oAuthService = oAuthService;
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const data = await this.oAuthService.handleAuthenticate({ email, password });
      response.status(200).json(data);
    } catch (err) {
      response.sendStatus(401);
    }
  }
}

export default OAuthController;
