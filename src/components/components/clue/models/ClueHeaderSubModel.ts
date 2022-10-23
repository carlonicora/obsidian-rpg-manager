import {AbstractHeaderSubModel} from "../../../../models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../../responses/enums/HeaderResponseType";
import {ResponseHeader} from "../../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../../responses/enums/ResponseType";
import {ClueInterface} from "../interfaces/ClueInterface";
import {RelationshipInterface} from "../../../../relationships/interfaces/RelationshipInterface";
import {DateService} from "../../../../services/date/DateService";

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
				'Discovery date',
				this.api.service.get<DateService>(DateService)?.getReadableDate(this.data.found, this.data),
				HeaderResponseType.DateSelector,
				{
					yamlIdentifier: 'data.found',
					date: this.data.found,
					placeholder: 'Clue discovery date'
				}
			)
		);

		return this.completeData(response);
	}
}
