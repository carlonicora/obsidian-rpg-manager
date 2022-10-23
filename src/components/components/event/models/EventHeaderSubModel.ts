import {AbstractHeaderSubModel} from "../../../../models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../../responses/enums/HeaderResponseType";
import {ResponseHeader} from "../../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../../responses/enums/ResponseType";
import {EventInterface} from "../interfaces/EventInterface";
import {RelationshipInterface} from "../../../../relationships/interfaces/RelationshipInterface";
import {DateService} from "../../../../services/date/DateService";

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
				'Event date',
				this.api.service.get<DateService>(DateService)?.getReadableDate(this.data.date, this.data),
				(this.data.campaign.fantasyCalendar !== undefined ? HeaderResponseType.FantasyDateSelector : HeaderResponseType.DateSelector),
				{
					yamlIdentifier: 'data.date',
					date: this.data.date,
					placeholder: 'Select the event date'
				}
			)
		);

		return this.completeData(response);
	}
}
