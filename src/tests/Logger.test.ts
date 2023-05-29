
import { LoggerNS } from '../server/Logger';
const logger = LoggerNS.Logger.getInstance();

describe('Logger', () => {
    test('LogLeven should not be case sensitive', () => {
        logger.setLogLevel("error");
        expect(logger.getLogLevel()).toBe("ERROR");
    });
});