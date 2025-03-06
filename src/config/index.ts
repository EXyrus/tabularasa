
import defaultConfig from './default.json';
import devConfig from './dev.json';
import qaConfig from './qa.json';
import prodConfig from './prod.json';

interface Config {
  ENV: string;
  HOST: string;
  API_HOST: string;
  AUTH_ENABLED: boolean;
  SENTRY?: {
    dsn: string;
  };
  CLOUDINARY?: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
    profilePreset: string;
    receiptPreset: string;
    blogPreset: string;
    prefix: string;
  };
  IS_PROD: boolean;
  remoteConfig?: {
    pusher: string;
  };
  LOGGER: string;
}

function getEnvironment(): string {
  // Check hostname to determine environment
  const hostname = window.location.hostname;
  
  if (hostname === 'tabularasa.ng') {
    return 'production';
  } else if (hostname === 'qa.tabularasa.ng') {
    return 'qa';
  } else {
    return 'dev';
  }
}

function loadConfig(): Config {
  const env = getEnvironment();
  let envConfig: Partial<Config> = {};
  
  switch (env) {
    case 'production':
      envConfig = prodConfig;
      break;
    case 'qa':
      envConfig = qaConfig;
      break;
    case 'dev':
    default:
      envConfig = devConfig;
      break;
  }
  
  // Merge with default config
  return { ...defaultConfig, ...envConfig } as Config;
}

const config = loadConfig();
export default config;
