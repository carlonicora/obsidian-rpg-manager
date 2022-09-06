import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {ResponseType} from "../../enums/ResponseType";
import {ContentType} from "../../enums/ContentType";
import {StringResponseInterface} from "../../interfaces/response/StringResponseInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {ContentFactory} from "../../factories/ContentFactory";

export class ResponseLine extends AbstractResponse implements StringResponseInterface {
	public content: ContentInterface;

	constructor(
	) {
		super();
		this.responseType = ResponseType.String;
		this.content = ContentFactory.create('', ContentType.String);
	}

	public addContent(
		content: ContentInterface,
	): void {
		this.content = content;
	}
}
