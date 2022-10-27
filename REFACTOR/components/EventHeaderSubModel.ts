import {AbstractHeaderSubModel} from "../models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../responses/enums/HeaderResponseType";
import {ResponseHeader} from "../responses/ResponseHeader";
import {HeaderResponseInterface} from "../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../src/core/enums/ComponentType";
import {ResponseType} from "../responses/enums/ResponseType";
import {EventInterface} from "../../src/components/event/interfaces/EventInterface";
import {RelationshipInterface} from "../../src/services/relationshipsService/interfaces/RelationshipInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class EventHeaderSubModel extends AbstractHeaderSubModel {
	protected data: EventInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;
		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;
		if (response === null) response = new ResponseHeader(this.app, this.currentComponent);
		response.type = ComponentType.Event;
		response.responseType = ResponseType.EventHeader;
		response.addElement(
			new ResponseHeaderElement(
				this.app,
				this.currentComponent,
				'EventModel dateService',
				this.api.service(DateService).getReadableDate(this.data.date, this.data),
				(this.data.campaign.fantasyCalendar !== undefined ? HeaderResponseType.FantasyDateSelector : HeaderResponseType.DateSelector),
				{
					yamlIdentifier: 'data.dateService',
					date: this.data.date,
					placeholder: 'Select the event dateService'
				}
			)
		);

		return this.completeData(response);
	}
}
