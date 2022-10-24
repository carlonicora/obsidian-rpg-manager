import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";

export interface BreadcrumbResponseInterface extends ResponseDataElementInterface {
	component: ComponentModelInterface|undefined,
	link: string;
	linkText: string|null;
	nextBreadcrumb: BreadcrumbResponseInterface|null;
	title: string|null;
	isInNewLine: boolean;
	mainTitle: string|null;
	function: any|null;
	functionParameters: any[]|null;
}
