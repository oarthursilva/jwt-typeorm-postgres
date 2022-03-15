import OAuthController from "./controllers/OAuthController";
import UsersController from "./controllers/UsersController";
import { AppRouter } from "./infra/middlewares/http/HTTPMiddleware";
import { VerifyJWT } from "./infra/middlewares/jwt/VerifyJWT";

const router = AppRouter();

router.post('/oauth/token', (request, response) => {
  const controller = new OAuthController();
  return controller.authenticate(request, response);
});

router.get('/user', VerifyJWT, (request, response) => {
  const controller = new UsersController();
  return controller.index(request, response);
});

router.post('/users', VerifyJWT, (request, response) => {
  const controller = new UsersController();
  return controller.create(request, response);
});


export default router;
