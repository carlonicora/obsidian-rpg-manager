import {BreadcrumbElementInterface} from "./interfaces/BreadcrumbElementInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";

export class BreadcrumbElement implements BreadcrumbElementInterface {
	public nextBreadcrumb: BreadcrumbElementInterface|null;

	public isInNewLine = false;
	public link: string;
	public linkText: string|null;
	public mainTitle: string|null = null;
	public title: string|null;

	public function: any|null = null;
	public functionParameters: any[]|null;

	constructor(
		public model: ModelInterface,
	) {
	}
}
