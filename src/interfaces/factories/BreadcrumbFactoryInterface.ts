import {ComponentInterface} from "../database/ComponentInterface";
import {BreadcrumbResponseInterface} from "../response/subModels/BreadcrumbResponseInterface";

export interface BreadcrumbFactoryInterface {
	create(
		record: ComponentInterface,
	): BreadcrumbResponseInterface;
}
