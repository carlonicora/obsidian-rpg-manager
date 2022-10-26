import {BreadcrumbResponseInterface} from "./BreadcrumbResponseInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface BreadcrumbFactoryInterface {
	create(
		component: ModelInterface,
	): BreadcrumbResponseInterface;
}
