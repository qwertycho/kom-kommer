require("dotenv").config();

export module LoggerNS {
  export class Logger {
    private static instance: Logger;
    protected logLevel: string = "ERROR";

    private values: object = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    };

    private constructor() {
      this.logLevel = String(process.env.LOG_LEVEL).toUpperCase();
    }

    public setLogLevel(logLevel: string): void {
      Logger.getInstance().logLevel = logLevel.toUpperCase();
    }

    public static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }

    public getLogLevel(): string {
      return this.logLevel;
    }

    public error(message: string): void {
      this.log(message, "ERROR");
    }

    public warn(message: string): void {
      this.log(message, "WARN");
    }

    public info(message: string): void {
      this.log(message, "INFO");
    }

    public debug(message: string): void {
      this.log(message, "DEBUG");
    }

    private log(message: string, MlogLevel: string): void {
      if (
        this.values[MlogLevel] <= this.values[Logger.getInstance().logLevel]
      ) {
        console.log(`${MlogLevel}: ${message}`);
      }
    }
  }
}
