import {AbstractResponse} from "../abstracts/AbstractResponse";
import {ResponseType} from "../enums/ResponseType";
import {ContentType} from "../enums/ContentType";
import {StringResponseInterface} from "../interfaces/response/StringResponseInterface";
import {ContentInterface} from "../interfaces/content/ContentInterface";
import {Factory} from "../Factory";

export class ResponseLine extends AbstractResponse implements StringResponseInterface {
	public content: ContentInterface;

	constructor(
	) {
		super();
		this.responseType = ResponseType.String;
		this.content = Factory.createContent('', ContentType.String);
	}

	public addContent(
		content: ContentInterface,
	): void {
		this.content = content;
	}
}
