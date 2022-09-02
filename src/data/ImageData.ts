import {GenericImageDataInterface} from "../interfaces/data/GenericImageDataInterface";
import {RpgFunctions} from "../RpgFunctions";
import {AbstractImageData} from "../abstracts/AbstractImageData";

export class ImageData extends AbstractImageData implements GenericImageDataInterface {
	constructor(
		data: Record<string, any>,
		width = 75,
		height = 75,
	) {
		super(data);

		this.image = (this.imageSrc !== null ? RpgFunctions.getImage(data, width, height) : '');
	}
}
