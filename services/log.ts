import { logger } from 'react-native-logs';

/**
 * custom log service, mostly done for the case I need to do something into
 * the logger without the side effect to refactor all the file
 * this is a singleton
 */
export default class Log {
  private static instance: Log;
  /* eslint-disable @typescript-eslint/no-explicit-any */ // todo fix the type
  private static log: any;

  /**
   * singleton handler
   * @returns {Log} the single instance of `Log`
   */
  public static getInstance(): Log {
    if (typeof Log.instance === 'undefined') Log.instance = new Log();
    return Log.instance;
  }

  public info(message: string): void {
    if (typeof Log.log === 'undefined') Log.log = logger.createLogger();
    Log.log.info(message);
  }

  public debug(message: string): void {
    if (typeof Log.log === 'undefined') Log.log = logger.createLogger();
    Log.log.debug(message);
  }

  public warn(message: string): void {
    if (typeof Log.log === 'undefined') Log.log = logger.createLogger();
    Log.log.warn(message);
  }

  public error(message: string): void {
    if (typeof Log.log === 'undefined') Log.log = logger.createLogger();
    Log.log.error(message);
  }
}
