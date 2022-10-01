import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../enums/ResponseType";
import {EventV2Interface} from "../../../_dbV2/components/interfaces/EventV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class EventHeaderSubModel extends AbstractHeaderSubModel {
	protected data: EventV2Interface;

	public async generateData(
		relationship: RelationshipV2Interface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Event;
		response.responseType = ResponseType.EventHeader;

		if (this.data.date != null) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Date', this.data.date.toDateString(), HeaderResponseType.Short));
		}

		return this.completeData(response);
	}
}
