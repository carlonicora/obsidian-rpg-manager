import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export interface BreadcrumbResponseInterface extends ResponseDataElementInterface {
	component: ComponentInterface|undefined,
	link: string;
	linkText: string|null;
	nextBreadcrumb: BreadcrumbResponseInterface|null;
	title: string|null;
	isInNewLine: boolean;
	mainTitle: string|null;
	function: any|null;
	functionParameters: Array<any>|null;
}
