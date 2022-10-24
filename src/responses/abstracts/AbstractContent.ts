import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {AbstractRpgManager} from "../../core/abstracts/AbstractRpgManager";
import {App} from "obsidian";

export abstract class AbstractContent extends AbstractRpgManager implements ContentInterface {
	public content: any|null;
	public isInLine=false;

	constructor(
		app: App,
		content: any|null,
		isInLine: boolean|null = null,
		public additionalInfo:any|undefined=undefined,
		public isEditable: boolean = false,
	) {
		super(app);
		this.content = content;
		if (isInLine != null){
			this.isInLine = isInLine;
		}
	}

	abstract fillContent(
		container: HTMLElement|undefined,
		sourcePath: string,
	): void;
}
