import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseBanner} from "../../../data/responses/ResponseBanner";
import {GenericImageDataInterface} from "../../../interfaces/data/GenericImageDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {TimelineDataInterface} from "../../../interfaces/data/TimelineDataInterface";
import {CampaignData, TimelineData} from "../data";

export class BannerComponent extends AbstractComponent{
	generateData(
		data: GenericImageDataInterface,
		title: string | null,
	): ResponseElementInterface | null {
		const response = new ResponseBanner();

		response.image = data.imageSrc;

		if (data instanceof CampaignData) {
			response.title = data.name;
			response.date = (<CampaignDataInterface>data).currentDate;
		} else if (data instanceof TimelineData) {
			response.title = 'Timeline';
			response.date = (<TimelineDataInterface>data).date;
			response.subtitle = (<TimelineDataInterface>data).campaign.name;
		}

		return response;
	}
}
