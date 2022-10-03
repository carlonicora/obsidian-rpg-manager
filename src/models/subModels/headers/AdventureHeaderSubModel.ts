import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../enums/ResponseType";
import {AdventureInterface} from "../../../database/components/interfaces/AdventureInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class AdventureHeaderSubModel extends AbstractHeaderSubModel {
	protected data: AdventureInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Adventure;
		response.responseType = ResponseType.AdventureHeader;

		response.metadata = {adventureId: this.data.id, sourceMeta: additionalInformation};

		return this.completeData(response);
	}
}
