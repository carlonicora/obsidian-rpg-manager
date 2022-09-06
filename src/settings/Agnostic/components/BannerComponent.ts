import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseBanner} from "../../../data/responses/ResponseBanner";
import {Campaign, RpgDataInterface, Timeline} from "../../../Data";

export class BannerComponent extends AbstractComponent{
	generateData(
		data: RpgDataInterface,
		title: string | null,
	): ResponseElementInterface | null {
		const response = new ResponseBanner();

		if (data instanceof Campaign) {
			response.image = data.image;
			response.title = data.name;
			response.date = data.currentDate ? data.currentDate.toDateString() : '';
		} else if (data instanceof Timeline) {
			response.image = data.campaign.image;
			response.title = 'Timeline';
			response.date = data.campaign.currentDate ? data.campaign.currentDate.toDateString() : '';
			response.subtitle = data.campaign.name;
		}

		return response;
	}
}
