import {BreadcrumbElementInterface} from "./interfaces/BreadcrumbElementInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";

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
		this.link = model.link;
		this.title = ComponentType[model.index.type];
	}
}
