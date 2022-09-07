import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {App} from "obsidian";
import {ResponseType} from "../../enums/ResponseType";
import {ContentType} from "../../enums/ContentType";
import {ImageResponseInterface} from "../../interfaces/response/ImageResponseInterface";

export class ResponseImage extends AbstractResponse implements ImageResponseInterface {
	public imgSrc: string|null;
	public width: number;
	public height: number;

	constructor(
		app: App,
	) {
		super(app);
		this.responseType = ResponseType.Image;
	}
}
