import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseBanner} from "../data/responses/ResponseBanner";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";

export class BannerComponent extends AbstractComponent{
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationship.component === undefined) return null;
		const data = relationship.component as CampaignInterface;

		const response = new ResponseBanner(this.app, this.currentElement);

		response.image = data.image;
		response.title = data.name;
		response.date = data.currentDate ? data.currentDate.toDateString() : '';

		return response;
	}
}
