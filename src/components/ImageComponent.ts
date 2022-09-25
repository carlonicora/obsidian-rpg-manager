import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseImage} from "../data/responses/ResponseImage";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class ImageComponent extends AbstractComponent{
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationship.component === undefined) return null;
		const data = relationship.component;

		const response = new ResponseImage(this.app, this.currentElement);

		response.imgSrc = data.image;
		response.height = 300;
		response.width = 300;

		return response;
	}
}
