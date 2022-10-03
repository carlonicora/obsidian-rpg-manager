import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../enums/ResponseType";
import {CampaignInterface} from "../../../database/components/interfaces/CampaignInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class CampaignHeaderSubModel extends AbstractHeaderSubModel {
	protected data: CampaignInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Campaign;
		response.responseType = ResponseType.CampaignHeader;

		response.metadata = {campaignId: this.data.id, sourceMeta: additionalInformation};

		return this.completeData(response);
	}
}
