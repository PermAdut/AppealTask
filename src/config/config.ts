import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  MONGODB_URI: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 4444,
  nodeEnv: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:24130/testDb',
};
export default config;
