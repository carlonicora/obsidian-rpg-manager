import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseBanner} from "../../../data/responses/ResponseBanner";
import {GenericImageDataInterface} from "../../../interfaces/data/GenericImageDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {TimelineDataInterface} from "../../../interfaces/data/TimelineDataInterface";
import {CampaignData} from "../data/CampaignData";
import {TimelineData} from "../data/TimelineData";

export class BannerComponent extends AbstractComponent{
	generateData(
		data: GenericImageDataInterface,
		title: string | null,
	): ResponseElementInterface | null {
		const response = new ResponseBanner();



		if (data instanceof CampaignData) {
			response.image = data.imageSrc;
			response.title = data.name;
			response.date = (<CampaignDataInterface>data).currentDate;
		} else if (data instanceof TimelineData) {
			response.image = data.campaign.imageSrc;
			response.title = 'Timeline';
			response.date = (<TimelineDataInterface>data).campaign.currentDate;
			response.subtitle = (<TimelineDataInterface>data).campaign.name;
		}

		return response;
	}
}
