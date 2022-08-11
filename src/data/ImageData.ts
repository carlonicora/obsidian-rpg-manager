import {GenericImageDataInterface} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "./functions/RpgFunctions";
import {AbstractImageData} from "../abstracts/AbstractData";

export class ImageData extends AbstractImageData implements GenericImageDataInterface {
	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
		width = 75,
		height = 75,
	) {
		super(functions, data);

		this.image = (this.imageSrc !== null ? functions.getImage(data, width, height) : '');
	}
}
