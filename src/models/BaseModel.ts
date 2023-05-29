import { LoggerNS } from "../server/Logger"
const logger = LoggerNS.Logger.getInstance();

export namespace models {
    export class BaseModel {
        protected logger = logger;

        render(): any {
            return {};
        }

    }
}