import { createConnection } from 'typeorm';

const db = {
  async setup(createConnectionModule = createConnection) {
    try {
      return await createConnectionModule();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default db;
