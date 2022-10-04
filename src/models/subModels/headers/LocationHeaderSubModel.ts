import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../responses/enums/HeaderResponseType";
import {ResponseType} from "../../../responses/enums/ResponseType";
import {LocationInterface} from "../../../databases/components/interfaces/LocationInterface";
import {RelationshipInterface} from "../../../relationships/interfaces/RelationshipInterface";

export class LocationHeaderSubModel extends AbstractHeaderSubModel {
	protected data: LocationInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Location;
		response.responseType = ResponseType.LocationHeader;

		if (this.data.address != null && this.data.address != ''){
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Address', this.data.address, HeaderResponseType.Short));
		}

		return this.completeData(response);
	}
}
