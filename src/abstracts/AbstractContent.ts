import {ContentInterface} from "../interfaces/ContentInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {App} from "obsidian";
import {ContentType} from "../enums/ContentType";

export abstract class AbstractContent extends AbstractRpgManager implements ContentInterface {
	public content: any|null;
	public isInLine=false;

	constructor(
		app: App,
		content: any|null,
		isInLine: boolean|null = null,
		public additionalInfo:any|undefined=undefined,
	) {
		super(app);
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
