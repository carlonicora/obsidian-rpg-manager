import {HeaderComponent} from "../../../components/HeaderComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {HeaderResponseInterface} from "../../../interfaces/response/HeaderResponseInterface";
import {ResponseHeaderElement} from "../../../data/responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {VampireCharacterInterface} from "../interfaces/VampireCharacterInterface";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";

export class VampireHeaderComponent extends HeaderComponent {
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationship.component === undefined) return null;
		const data: VampireCharacterInterface|undefined = relationship.component as VampireCharacterInterface;

		const response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (data.generation != null) {
			response.addElement(new ResponseHeaderElement(this.app, 'Generation', data.generation.toString(), HeaderResponseType.Short));
		}

		return response;
	}
}
