
import Logger from 'js-logger';
import { getEnvironment } from '@/helpers/env';

// Configure logger
Logger.useDefaults({
  defaultLevel: getEnvironment() === 'production' ? Logger.ERROR : Logger.DEBUG,
  formatter: function (messages, context) {
    messages.unshift(`[${context.name}] ${new Date().toISOString()}`);
  }
});

// Create a named logger
export const createLogger = (name: string) => {
  return Logger.get(name);
};

// Export default logger
export default Logger;
