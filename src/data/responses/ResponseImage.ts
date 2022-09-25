import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {App} from "obsidian";
import {ResponseType} from "../../enums/ResponseType";
import {ImageResponseInterface} from "../../interfaces/response/ImageResponseInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";

export class ResponseImage extends AbstractResponse implements ImageResponseInterface {
	public imgSrc: string|null|undefined;
	public width: number;
	public height: number;

	constructor(
		app: App,
		currentElement: RecordInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.Image;
	}
}
