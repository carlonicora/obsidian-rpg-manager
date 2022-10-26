import {AbstractHeaderSubModel} from "../../../../REFACTOR/models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../REFACTOR/responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../../../../REFACTOR/responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../REFACTOR/responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ResponseHeaderElement} from "../../../../REFACTOR/responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../../REFACTOR/responses/enums/HeaderResponseType";
import {ResponseType} from "../../../../REFACTOR/responses/enums/ResponseType";
import {MusicInterface} from "../interfaces/MusicInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";

export class MusicHeaderSubModel extends AbstractHeaderSubModel {
	protected data: MusicInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;
		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;
		if (response === null)
			response = new ResponseHeader(this.app, this.currentComponent);

		response.type = ComponentType.Music;
		response.responseType = ResponseType.MusicHeader;
		if (this.data.images.length === 0) {
			response.imgSrc = await this.data.getThumbnail();
		} else if (this.data.images.length > 0) {
			response.imgSrc = this.data.images[0].src;
		}

		if (this.data.url !== undefined)
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'link', this.data.url, HeaderResponseType.Long, {editableField: 'data.url'}));

		return this.completeData(response);
	}
}
