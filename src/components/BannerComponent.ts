import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseBanner} from "../data/responses/ResponseBanner";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {Campaign} from "../data/Campaign";
import {Timeline} from "../data/Timeline";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class BannerComponent extends AbstractComponent{
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationship.component === undefined) return null;
		const data = relationship.component;

		const response = new ResponseBanner(this.app);

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
