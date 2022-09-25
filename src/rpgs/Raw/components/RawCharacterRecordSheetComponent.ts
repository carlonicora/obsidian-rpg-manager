import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {RawResponseCharacterRecordSheet} from "../data/responses/RawResponseCharacterRecordSheet";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";

export class RawCharacterRecordSheetComponent extends AbstractComponent {
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		const response = new RawResponseCharacterRecordSheet(this.app, this.currentElement, additionalInformation);

		return response;
	}
}
