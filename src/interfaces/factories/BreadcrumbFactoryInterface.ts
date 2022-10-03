import {BreadcrumbResponseInterface} from "../response/subModels/BreadcrumbResponseInterface";
import {ComponentInterface} from "../../database/interfaces/ComponentInterface";

export interface BreadcrumbFactoryInterface {
	create(
		component: ComponentInterface,
	): BreadcrumbResponseInterface;
}
