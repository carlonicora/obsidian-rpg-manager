import {Api} from "../Api";
import {AbstractImageData} from "../abstracts/AbstractData";
import {GenericImageDataInterface} from "../interfaces/data/GenericImageDataInterface";

export class ImageData extends AbstractImageData implements GenericImageDataInterface {
	constructor(
		api: Api,
		data: Record<string, any>,
		width = 75,
		height = 75,
	) {
		super(api, data);

		this.image = (this.imageSrc !== null ? this.api.getImage(data, width, height) : '');
	}
}
