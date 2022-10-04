import {AbstractResponse} from "../abstracts/AbstractResponse";
import {BreadcrumbResponseInterface} from "./interfaces/BreadcrumbResponseInterface";
import {ResponseType} from "./enums/ResponseType";
import {App} from "obsidian";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";

export class ResponseBreadcrumb extends AbstractResponse implements BreadcrumbResponseInterface {
	public link: string;
	public linkText: string|null;
	public nextBreadcrumb: BreadcrumbResponseInterface|null;
	public title: string|null = null;
	public isInNewLine = false;
	public mainTitle: string|null = null;
	public function: any|null = null;
	public functionParameters: Array<any>|null;

	constructor(
		app: App,
		currentElement: ComponentInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.Breadcrumb;
	}
}
