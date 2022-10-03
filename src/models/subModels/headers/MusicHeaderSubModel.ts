import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {ResponseType} from "../../../enums/ResponseType";
import {MusicInterface} from "../../../database/components/interfaces/MusicInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class MusicHeaderSubModel extends AbstractHeaderSubModel {
	protected data: MusicInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Music;
		response.responseType = ResponseType.MusicHeader;

		if (this.data.image === undefined) {
			response.imgSrc = await this.data.getThumbnail();
		} else if (this.data.image !== null) {
			response.imgSrc = this.data.image;
		}

		if (this.data.url !== undefined) response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'link', this.data.url, HeaderResponseType.Long));

		return this.completeData(response);
	}
}
