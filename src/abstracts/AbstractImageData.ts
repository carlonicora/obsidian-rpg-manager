import {GenericImageDataInterface} from "../interfaces/data/GenericImageDataInterface";
import {RpgFunctions} from "../RpgFunctions";
import {AbstractData} from "./AbstractData";

export abstract class AbstractImageData extends AbstractData implements GenericImageDataInterface {
	public imageSrc: string|null;
	public image: string;
	public imageSrcElement: HTMLImageElement|null;

	constructor(
		data: Record<string, any>,
	) {
		super(data);

		this.imageSrc = RpgFunctions.getImageLink(data);
		this.imageSrcElement = RpgFunctions.getImageElement(data);
		this.image = (this.imageSrc !== null ? RpgFunctions.getImage(data) : '');
	}

	getImage(
		width = 75,
		height = 75,
	): string {
		if (this.imageSrc === null) return "";

		return RpgFunctions.getImage(this.data, width, height);
	}
}
