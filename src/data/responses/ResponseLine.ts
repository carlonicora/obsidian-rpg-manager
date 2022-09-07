import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {ResponseType} from "../../enums/ResponseType";
import {ContentType} from "../../enums/ContentType";
import {StringResponseInterface} from "../../interfaces/response/StringResponseInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {ContentFactory} from "../../factories/ContentFactory";
import {App} from "obsidian";

export class ResponseLine extends AbstractResponse implements StringResponseInterface {
	public content: ContentInterface;

	constructor(
		app: App,
	) {
		super(app);
		this.responseType = ResponseType.String;
		this.content = this.app.plugins.getPlugin('rpg-manager').factories.contents.create('', ContentType.String);
	}

	public addContent(
		content: ContentInterface,
	): void {
		this.content = content;
	}
}
