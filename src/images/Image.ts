import {ImageInterface} from "./interfaces/ImageInterface";
import {ImageDimensionInterface} from "./interfaces/ImageDimensionInterface";

export class Image implements ImageInterface {
	private _caption: string;
	private _src: string;

	constructor(
		src: string,
	) {
		this._src = src;
		this._caption = '';
	}

	get caption(): string {
		return this._caption;
	}

	set caption(caption: string) {
		this._caption = caption;
	}

	get src(): string {
		return this._src;
	}
}
