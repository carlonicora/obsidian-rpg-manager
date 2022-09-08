import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {App} from "obsidian";
import {ResponseType} from "../../enums/ResponseType";
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
