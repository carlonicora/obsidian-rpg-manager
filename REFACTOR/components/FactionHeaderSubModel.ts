import {AbstractHeaderSubModel} from "../models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../responses/ResponseHeader";
import {HeaderResponseInterface} from "../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../src/core/enums/ComponentType";
import {ResponseType} from "../responses/enums/ResponseType";
import {FactionInterface} from "../../src/components/faction/interfaces/FactionInterface";
import {RelationshipInterface} from "../../src/services/relationshipsService/interfaces/RelationshipInterface";

export class FactionHeaderSubModel extends AbstractHeaderSubModel {
	protected data: FactionInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;
		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;
		if (response === null)
			response = new ResponseHeader(this.app, this.currentComponent);

		response.type = ComponentType.Faction;
		response.responseType = ResponseType.FactionHeader;
		return this.completeData(response);
	}
}
