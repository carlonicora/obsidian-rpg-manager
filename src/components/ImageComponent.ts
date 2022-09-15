import {AbstractComponent} from "../abstracts/AbstractComponent";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseImage} from "../data/responses/ResponseImage";

export class ImageComponent extends AbstractComponent{
	public async generateData(
		data: RecordInterface,
		title: string | null,
	): Promise<ResponseElementInterface|null> {
		const response = new ResponseImage(this.app);

		response.imgSrc = data.image;
		response.height = 300;
		response.width = 300;

		return response;
	}
}
