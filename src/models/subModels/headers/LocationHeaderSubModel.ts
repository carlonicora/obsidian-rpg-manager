import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {ResponseType} from "../../../enums/ResponseType";
import {LocationV2Interface} from "../../../_dbV2/components/interfaces/LocationV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class LocationHeaderSubModel extends AbstractHeaderSubModel {
	protected data: LocationV2Interface;

	public async generateData(
		relationship: RelationshipV2Interface,
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
