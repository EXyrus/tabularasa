import logger from 'js-logger';
import { isProdEnv, isTestEnv } from 'helpers/env';

// Log messages will be written to the window's console.
logger.useDefaults();
logger.setHandler(function logHandler() {
    // Send messages to a custom logging endpoint for analysis.
    if (isProdEnv()) {
        return;
    }
});

export const axiosLogger = logger.get('axios');

if (isTestEnv()) {
    logger.setLevel(logger.OFF);
} else if (isProdEnv()) {
    axiosLogger.setLevel(logger.OFF);
}

export default logger;
