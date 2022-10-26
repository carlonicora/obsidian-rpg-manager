import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface BreadcrumbElementInterface {
	model: ModelInterface;

	nextBreadcrumb: BreadcrumbElementInterface|null;

	isInNewLine: boolean;
	link: string;
	linkText: string|null;
	mainTitle: string|null;
	title: string|null;

	function: any|null;
	functionParameters: any[]|null;
}
