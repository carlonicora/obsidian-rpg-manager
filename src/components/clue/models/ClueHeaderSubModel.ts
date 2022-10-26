import {AbstractHeaderSubModel} from "../../../../REFACTOR/models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../REFACTOR/responses/interfaces/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../../REFACTOR/responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../../REFACTOR/responses/enums/HeaderResponseType";
import {ResponseHeader} from "../../../../REFACTOR/responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../REFACTOR/responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ResponseType} from "../../../../REFACTOR/responses/enums/ResponseType";
import {ClueInterface} from "../interfaces/ClueInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class ClueHeaderSubModel extends AbstractHeaderSubModel {
	protected data: ClueInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;
		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;
		if (response === null) response = new ResponseHeader(this.app, this.currentComponent);
		response.type = ComponentType.Clue;
		response.responseType = ResponseType.ClueHeader;
		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Found', (this.data.found !== undefined ? 'Yes' : 'No'), HeaderResponseType.Short));
		response.addElement(
			new ResponseHeaderElement(
				this.app,
				this.currentComponent,
				'Discovery dateService',
				this.api.service(DateService).getReadableDate(this.data.found, this.data),
				(this.data.campaign.fantasyCalendar !== undefined ? HeaderResponseType.FantasyDateSelector : HeaderResponseType.DateSelector),
				{
					yamlIdentifier: 'data.found',
					date: this.data.found,
					placeholder: 'ClueModel discovery dateService'
				}
			)
		);

		return this.completeData(response);
	}
}
