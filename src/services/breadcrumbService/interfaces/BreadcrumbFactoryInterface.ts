import {BreadcrumbElementInterface} from "./BreadcrumbElementInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface BreadcrumbFactoryInterface {
	create(
		component: ModelInterface,
	): BreadcrumbElementInterface;
}
