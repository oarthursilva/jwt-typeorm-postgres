import express, { Router } from 'express';
import cors from 'cors';

const HTTPMiddleware = (expressModule = express, corsModule = cors) => ({
  setup({ router }) {
    return expressModule()
      .use(expressModule.json())
      .use(expressModule.urlencoded({ extended: false }))
      .use(corsModule())
      .use(router);
  }
});

const AppRouter = (routerModule = Router()) => routerModule;

export { AppRouter };
export default HTTPMiddleware;
