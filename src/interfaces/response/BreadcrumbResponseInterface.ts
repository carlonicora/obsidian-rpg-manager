import {ResponseElementInterface} from "./ResponseElementInterface";

export interface BreadcrumbResponseInterface extends ResponseElementInterface {
	link: string;
	linkText: string|null;
	nextBreadcrumb: BreadcrumbResponseInterface|null;
	title: string|null;
	isInNewLine: boolean;
	mainTitle: string|null;
	function: any|null;
	functionParameters: Array<any>|null;
}
