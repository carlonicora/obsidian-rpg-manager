import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {BannerResponseInterface} from "../../interfaces/response/BannerResponseInterface";
import {ResponseType} from "../../enums/ResponseType";
import {App} from "obsidian";

export class ResponseBanner extends AbstractResponse implements BannerResponseInterface {
	public image: string|null;
	public title: string;
	public subtitle: string|null;
	public date: string|null;

	constructor(
		app: App,
	) {
		super(app);
		this.responseType = ResponseType.Banner;
	}
}
