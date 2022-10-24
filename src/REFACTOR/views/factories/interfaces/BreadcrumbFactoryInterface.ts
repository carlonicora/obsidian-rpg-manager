import {BreadcrumbResponseInterface} from "../../../../responses/interfaces/BreadcrumbResponseInterface";
import {ComponentModelInterface} from "../../../../api/componentManager/interfaces/ComponentModelInterface";

export interface BreadcrumbFactoryInterface {
	create(
		component: ComponentModelInterface,
	): BreadcrumbResponseInterface;
}
