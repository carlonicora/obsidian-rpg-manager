import {AbstractHeaderSubModel} from "../../../../models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseHeaderElement} from "../../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../../responses/enums/HeaderResponseType";
import {ResponseType} from "../../../../responses/enums/ResponseType";
import {LocationInterface} from "../interfaces/LocationInterface";
import {RelationshipInterface} from "../../../../relationships/interfaces/RelationshipInterface";

export class LocationHeaderSubModel extends AbstractHeaderSubModel {
	protected data: LocationInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentComponent);

		response.type = ComponentType.Location;
		response.responseType = ResponseType.LocationHeader;

		if (this.data.address != null && this.data.address != ''){
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Address', this.data.address, HeaderResponseType.Short, {editableField: 'data.address'}));
		}

		return this.completeData(response);
	}
}
