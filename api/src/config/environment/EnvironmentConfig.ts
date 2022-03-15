import DotEnv from '../../infra/dotenv/DotEnv';

const environmentConfig = {
  config() {
    DotEnv.setup();
  }
}

export default environmentConfig;
