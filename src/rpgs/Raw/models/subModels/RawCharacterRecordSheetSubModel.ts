import {AbstractSubModel} from "../../../../abstracts/AbstractSubModel";
import {ResponseDataElementInterface} from "../../../../interfaces/response/ResponseDataElementInterface";
import {RawResponseCharacterRecordSheet} from "../../data/responses/RawResponseCharacterRecordSheet";
import {RelationshipInterface} from "../../../../interfaces/RelationshipInterface";

export class RawCharacterRecordSheetSubModel extends AbstractSubModel {
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		const response = new RawResponseCharacterRecordSheet(this.app, this.currentElement, additionalInformation);

		return response;
	}
}
