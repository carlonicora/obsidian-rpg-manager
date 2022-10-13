import {BreadcrumbResponseInterface} from "../../../responses/interfaces/BreadcrumbResponseInterface";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";

export interface BreadcrumbFactoryInterface {
	create(
		component: ComponentInterface,
	): BreadcrumbResponseInterface;
}
