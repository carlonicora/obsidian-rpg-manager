import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {ImageFactoryInterface} from "./interfaces/ImageFactoryInterface";
import {ImageInterface} from "../interfaces/ImageInterface";
import {Image} from "../Image";
import {TAbstractFile, TFile, TFolder} from "obsidian";
import {AbstractComponentData} from "../../components/abstracts/AbstractComponentData";

export class ImageFactory extends AbstractFactory implements ImageFactoryInterface {
	public create(
		src: string,
		caption?: string,
	): ImageInterface|undefined {
		console.warn(src);
		console.warn(caption)
		const imageLocation = this.getImageLocation(src);

		if (imageLocation === undefined)
			return undefined

		const response = new Image(imageLocation);
		if (caption !== undefined)
			response.caption = caption;

		return response;
	}

	private getImageLocation(
		src: string
	): string|undefined {
		if (src.startsWith('http'))
			return src;

		if (this.app.vault.getAbstractFileByPath(src) === undefined)
			return undefined;

		if (AbstractComponentData.root === undefined)
			AbstractComponentData.initialiseRoots(this.app);

		return  AbstractComponentData.root + src;
	}
}
