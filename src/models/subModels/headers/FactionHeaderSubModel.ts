import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../enums/ResponseType";
import {FactionV2Interface} from "../../../_dbV2/components/interfaces/FactionV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class FactionHeaderSubModel extends AbstractHeaderSubModel {
	protected data: FactionV2Interface;

	public async generateData(
		relationship: RelationshipV2Interface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Faction;
		response.responseType = ResponseType.FactionHeader;

		return this.completeData(response);
	}
}
