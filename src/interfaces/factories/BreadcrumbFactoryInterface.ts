import {BreadcrumbResponseInterface} from "../response/subModels/BreadcrumbResponseInterface";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";

export interface BreadcrumbFactoryInterface {
	create(
		component: ComponentV2Interface,
	): BreadcrumbResponseInterface;
}
