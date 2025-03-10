
import Logger from 'js-logger';
import { isDevelopment, isTest } from '@/helpers/env';

// Configure the logger
Logger.useDefaults({
  defaultLevel: isDevelopment() || isTest() ? Logger.DEBUG : Logger.WARN,
  formatter: function (messages, context) {
    messages.unshift(new Date().toISOString() + ' ' + context.name + ':');
  }
});

// Create and export the logger
const logger = Logger.get('app');

export default logger;
