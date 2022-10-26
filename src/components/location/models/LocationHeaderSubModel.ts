import {AbstractHeaderSubModel} from "../../../../REFACTOR/models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../REFACTOR/responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../../../../REFACTOR/responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../REFACTOR/responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ResponseHeaderElement} from "../../../../REFACTOR/responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../../REFACTOR/responses/enums/HeaderResponseType";
import {ResponseType} from "../../../../REFACTOR/responses/enums/ResponseType";
import {LocationInterface} from "../interfaces/LocationInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";

export class LocationHeaderSubModel extends AbstractHeaderSubModel {
	protected data: LocationInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;
		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;
		if (response === null)
			response = new ResponseHeader(this.app, this.currentComponent);

		response.type = ComponentType.Location;
		response.responseType = ResponseType.LocationHeader;
		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Address', this.data.address, HeaderResponseType.Short, {editableField: 'data.address'}));

		return this.completeData(response);
	}
}
