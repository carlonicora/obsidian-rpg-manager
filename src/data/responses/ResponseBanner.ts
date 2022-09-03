import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {BannerResponseInterface} from "../../interfaces/response/BannerResponseInterface";
import {ResponseType} from "../../enums/ResponseType";

export class ResponseBanner extends AbstractResponse implements BannerResponseInterface {
	public image: string|null;
	public title: string;
	public subtitle: string|null;
	public date: string|null;

	constructor() {
		super();
		this.responseType = ResponseType.Banner;
	}
}
