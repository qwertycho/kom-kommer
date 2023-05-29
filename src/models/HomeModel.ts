import { models } from "../models/BaseModel";

export namespace Mmodels {
    export class HomeModel extends models.BaseModel {
        constructor() {
            super();
            this.logger.info("HomeModel constructor");
        }

        public render(): any {
            return {
                title: "About Page",
            }
        }
    }
}