import {AbstractSubModel} from "./AbstractSubModel";
import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../../responses/ResponseHeader";
import {ContentType} from "../../responses/enums/ContentType";
import {ResponseHeaderElement} from "../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../responses/enums/HeaderResponseType";
import {ModelInterface} from "../../../src/api/modelsManager/interfaces/ModelInterface";
import {RelationshipInterface} from "../../../src/services/relationshipsService/interfaces/RelationshipInterface";

export abstract class AbstractHeaderSubModel extends AbstractSubModel {
	protected data: ModelInterface;
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
		const response = new ResponseHeader(this.app, this.currentComponent);

		response.link = this.factories.contents.create(this.data.link, ContentType.Link);
		response.name = this.data.file.basename;

		if (this.data.synopsis != null && this.data.synopsis != '') {
			this.synopsis = this.data.synopsis;
		}
		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, this.synopsisTitle, this.synopsis, HeaderResponseType.Long, {editableField: 'data.synopsis'}));

		return response;
	}

	protected completeData(
		response: ResponseDataElementInterface,
	): ResponseDataElementInterface {
		(<ResponseHeader>response).images = this.data.images;

		return response;
	}
}
