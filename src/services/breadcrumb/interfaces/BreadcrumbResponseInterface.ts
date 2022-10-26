import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface BreadcrumbResponseInterface extends ResponseDataElementInterface {
	component: ModelInterface|undefined,
	link: string;
	linkText: string|null;
	nextBreadcrumb: BreadcrumbResponseInterface|null;
	title: string|null;
	isInNewLine: boolean;
	mainTitle: string|null;
	function: any|null;
	functionParameters: any[]|null;
}
