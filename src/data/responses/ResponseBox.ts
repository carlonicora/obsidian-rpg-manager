import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {BoxResponseInterface} from "../../interfaces/response/BoxResponseInterface";
import {ResponseType} from "../../enums/ResponseType";

export class ResponseBox extends AbstractResponse implements BoxResponseInterface {
	public title: string;
	public content: string|null;
	public colour = 'white';

	constructor() {
		super();
		this.responseType = ResponseType.Box;
	}
}
