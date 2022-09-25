import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {BannerResponseInterface} from "../../interfaces/response/BannerResponseInterface";
import {ResponseType} from "../../enums/ResponseType";
import {App} from "obsidian";
import {RecordInterface} from "../../interfaces/database/RecordInterface";

export class ResponseBanner extends AbstractResponse implements BannerResponseInterface {
	public image: string|null|undefined;
	public title: string;
	public subtitle: string|null;
	public date: string|null;

	constructor(
		app: App,
		currentElement: RecordInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.Banner;
	}
}
