import {AbstractHeaderSubModel} from "../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {ResponseType} from "../../../responses/enums/ResponseType";
import {SubplotInterface} from "../../../databases/components/interfaces/SubplotInterface";
import {RelationshipInterface} from "../../../relationships/interfaces/RelationshipInterface";

export class SubplotHeaderSubModel extends AbstractHeaderSubModel {
	protected data: SubplotInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Subplot;
		response.responseType = ResponseType.SubplotHeader;

		return this.completeData(response);
	}
}
