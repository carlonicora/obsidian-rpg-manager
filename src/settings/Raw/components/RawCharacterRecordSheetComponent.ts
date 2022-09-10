import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {CharacterInterface} from "../../../interfaces/data/CharacterInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {RawResponseCharacterRecordSheet} from "../data/responses/RawResponseCharacterRecordSheet";

export class RawCharacterRecordSheetComponent extends AbstractComponent {
	generateData(
		data: CharacterInterface,
		title: string | null,
		additionalInformation: any|null,
	): ResponseElementInterface | null {
		const response = new RawResponseCharacterRecordSheet(this.app, additionalInformation);

		return response;
	}
}
