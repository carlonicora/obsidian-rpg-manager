import {ImageInterface} from "../interfaces/ImageInterface";

export class Image implements ImageInterface {
	private _caption: string;
	private _src: string;
	private _path: string;

	constructor(
		path: string,
		src: string,
	) {
		this._path = path;
		this._src = src;
		this._caption = '';
	}

	get path(): string {
		return this._path;
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
