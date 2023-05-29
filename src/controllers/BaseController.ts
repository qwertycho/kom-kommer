import { LoggerNS } from "../server/Logger"
const logger = LoggerNS.Logger.getInstance();

export namespace BControllers{
    export class BaseController {
        protected readonly logger = logger;

        public getPage(): any {
            return {};
        }

        public notFound(page: string): any {
            logger.info("404: " + page);
            return "404";
        }

    }
}