import {AbstractComponent} from "../abstracts/AbstractComponent";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseImage} from "../data/responses/ResponseImage";

export class ImageComponent extends AbstractComponent{
	public async generateData(
		data: RpgDataInterface,
		title: string | null,
	): Promise<ResponseElementInterface|null> {
		const response = new ResponseImage(this.app);

		response.imgSrc = data.image;
		response.height = 300;
		response.width = 300;

		return response;
	}
}
