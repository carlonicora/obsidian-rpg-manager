import {BreadcrumbElementInterface} from "./BreadcrumbElementInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export interface BreadcrumbFactoryInterface {
	create(
		component: ModelInterface,
	): BreadcrumbElementInterface;
}
