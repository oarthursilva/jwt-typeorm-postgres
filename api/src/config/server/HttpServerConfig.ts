import HTTPServer from '../../infra/server/HttpServer';
import environmentConfig from '../environment/EnvironmentConfig';
import router from '../../routes';

const httpServerConfig = (environmentConfigModule = environmentConfig) => ({
  config() {
    const PORT = '3000';

    environmentConfigModule.config();

    HTTPServer().setup({ router }).listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
    })
  }
})

export default httpServerConfig;
