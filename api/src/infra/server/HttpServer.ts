import { createServer } from 'http';
import HTTPMiddleware from '../middlewares/http/HTTPMiddleware';

const HTTPServer = (httpMiddlewareModule = HTTPMiddleware(), createServerModule = createServer) => ({
  setup({ router }) {
    const http = httpMiddlewareModule.setup({ router });
    return createServerModule(http);
  }
});

export default HTTPServer;
