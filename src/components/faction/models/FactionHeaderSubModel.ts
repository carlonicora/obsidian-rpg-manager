import {AbstractHeaderSubModel} from "../../../../REFACTOR/models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../REFACTOR/responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../../../../REFACTOR/responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../REFACTOR/responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ResponseType} from "../../../../REFACTOR/responses/enums/ResponseType";
import {FactionInterface} from "../interfaces/FactionInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";

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
