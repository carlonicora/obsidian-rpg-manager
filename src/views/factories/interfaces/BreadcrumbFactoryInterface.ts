import {BreadcrumbResponseInterface} from "../../../responses/interfaces/BreadcrumbResponseInterface";
import {ComponentInterface} from "../../../databases/interfaces/ComponentInterface";

export interface BreadcrumbFactoryInterface {
	create(
		component: ComponentInterface,
	): BreadcrumbResponseInterface;
}
