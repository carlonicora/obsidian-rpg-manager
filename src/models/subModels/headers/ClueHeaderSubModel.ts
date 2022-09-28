import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ClueInterface} from "../../../interfaces/components/ClueInterface";
import {ResponseType} from "../../../enums/ResponseType";

export class ClueHeaderSubModel extends AbstractHeaderSubModel {
	protected data: ClueInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Clue;
		response.responseType = ResponseType.ClueHeader;

		const clueFound = this.data.isFound
			? 'Clue found on ' + this.data.found?.toDateString()
			: '<span class="rpgm-missing">Clue not found yet</span>';

		response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Found', clueFound, HeaderResponseType.Short));

		return this.completeData(response);
	}
}
