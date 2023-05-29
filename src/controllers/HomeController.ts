import { Mmodels } from "../models/HomeModel";
import { BControllers } from "../controllers/BaseController";


export namespace Controllers{
    export class HomeController extends BControllers.BaseController {
        private model: any;

        constructor() {
            super();
            this.logger.info("HomeController constructor");
            this.model = new Mmodels.HomeModel();
        }

        public getPage(): any {
            return this.model.render();
        }

    }
}