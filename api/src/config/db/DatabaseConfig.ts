import db from '../../infra/db/Database';

const databaseConfig = () => ({
  async config() {
    try {
      await db.setup();
      console.log('🎲 Connected on database')
    } catch (err) {
      console.log(`❌ Database connection failed: ${err}`)
    }
  }
})

export default databaseConfig;
