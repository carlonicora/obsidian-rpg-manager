import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../enums/ResponseType";
import {EventInterface} from "../../../database/components/interfaces/EventInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class EventHeaderSubModel extends AbstractHeaderSubModel {
	protected data: EventInterface;

	public async generateData(
		relationship: RelationshipInterface,
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
