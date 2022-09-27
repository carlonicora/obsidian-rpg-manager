import {HeaderSubModel} from "../../../../models/subModels/HeaderSubModel";
import {ResponseDataElementInterface} from "../../../../interfaces/response/ResponseDataElementInterface";
import {HeaderResponseInterface} from "../../../../interfaces/response/subModels/HeaderResponseInterface";
import {ResponseHeaderElement} from "../../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../../enums/HeaderResponseType";
import {VampireCharacterInterface} from "../../interfaces/VampireCharacterInterface";
import {RelationshipInterface} from "../../../../interfaces/RelationshipInterface";

export class VampireHeaderSubModel extends HeaderSubModel {
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (relationship.component === undefined) return null;
		const data: VampireCharacterInterface|undefined = relationship.component as VampireCharacterInterface;

		const response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (data.generation != null) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Generation', data.generation.toString(), HeaderResponseType.Short));
		}

		return response;
	}
}
