import {AbstractResponse} from "./abstracts/AbstractResponse";
import {BreadcrumbResponseInterface} from "../services/breadcrumb/interfaces/BreadcrumbResponseInterface";
import {ResponseType} from "./enums/ResponseType";
import {App} from "obsidian";
import {ModelInterface} from "../api/modelsManager/interfaces/ModelInterface";

export class ResponseBreadcrumb extends AbstractResponse implements BreadcrumbResponseInterface {
	public component: ModelInterface|undefined = undefined;
	public link: string;
	public linkText: string|null;
	public nextBreadcrumb: BreadcrumbResponseInterface|null;
	public title: string|null = null;
	public isInNewLine = false;
	public mainTitle: string|null = null;
	public function: any|null = null;
	public functionParameters: any[]|null;

	constructor(
		app: App,
		currentComponent: ModelInterface,
	) {
		super(app, currentComponent);
		this.responseType = ResponseType.Breadcrumb;
	}
}
