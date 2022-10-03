import {AbstractSubModel} from "./AbstractSubModel";
import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {ResponseHeader} from "../responses/ResponseHeader";
import {ContentType} from "../enums/ContentType";
import {ResponseHeaderElement} from "../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../enums/HeaderResponseType";
import {ComponentInterface} from "../database/interfaces/ComponentInterface";
import {RelationshipInterface} from "../database/relationships/interfaces/RelationshipInterface";

export abstract class AbstractHeaderSubModel extends AbstractSubModel {
	protected data: ComponentInterface;
	protected synopsis: string;
	protected synopsisTitle: string;

	protected initialiseData(
		relationship: RelationshipInterface,
	): boolean {
		if (relationship.component === undefined) return false;
		this.data = relationship.component;
		this.synopsis = '<span class="rpgm-missing">Synopsis missing</span>';
		this.synopsisTitle = 'Synopsis';

		return true;
	}

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		const response = new ResponseHeader(this.app, this.currentElement);

		response.link = this.factories.contents.create(this.data.link, ContentType.Link);
		response.name = this.data.file.basename;

		if (this.data.synopsis != null && this.data.synopsis != '') {
			this.synopsis = this.data.synopsis;
		}
		response.addElement(new ResponseHeaderElement(this.app, this.currentElement, this.synopsisTitle, this.synopsis, HeaderResponseType.Long));

		return response;
	}

	protected completeData(
		response: ResponseDataElementInterface,
	): ResponseDataElementInterface {
		if (this.data.image !== null) {
			(<ResponseHeader>response).imgSrc = this.data.image;
			(<ResponseHeader>response).imgWidth = 300;
			(<ResponseHeader>response).imgHeight = 300;
		}

		return response;
	}
}
