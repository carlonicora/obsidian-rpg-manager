import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {BreadcrumbResponseInterface} from "../../interfaces/response/BreadcrumbResponseInterface";
import {ResponseType} from "../../enums/ResponseType";

export class ResponseBreadcrumb extends AbstractResponse implements BreadcrumbResponseInterface {
	public link: string;
	public linkText: string|null;
	public nextBreadcrumb: BreadcrumbResponseInterface|null;
	public title: string|null = null;
	public isInNewLine = false;
	public mainTitle: string|null = null;

	constructor() {
		super();
		this.responseType = ResponseType.Breadcrumb;
	}
}
