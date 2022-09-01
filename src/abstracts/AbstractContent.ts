import {ContentInterface} from "../interfaces/content/ContentInterface";

export abstract class AbstractContent implements ContentInterface {
	protected content: any|null;
	public isInLine = false;

	constructor(
		content: any|null,
		isInLine: boolean|null = null,
	) {
		this.content = content;
		if (isInLine != null){
			this.isInLine = isInLine;
		}
	}

	abstract fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void;
}
