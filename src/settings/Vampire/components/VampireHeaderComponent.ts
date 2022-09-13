import {HeaderComponent} from "../../../components/HeaderComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {HeaderResponseInterface} from "../../../interfaces/response/HeaderResponseInterface";
import {ResponseHeaderElement} from "../../../data/responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {VampireCharacterInterface} from "../interfaces/VampireCharacterInterface";

export class VampireHeaderComponent extends HeaderComponent {
	generateData(
		data: VampireCharacterInterface,
		title: string | null,
		additionalInformation: any|null = null,
	): ResponseElementInterface | null {
		const response = super.generateData(data, title, additionalInformation) as HeaderResponseInterface;

		if (data.generation != null) {
			response.addElement(new ResponseHeaderElement(this.app, 'Generation', data.generation.toString(), HeaderResponseType.Short));
		}

		return response;
	}
}
