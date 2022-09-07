import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {CharacterRecordSheetResponseInterface} from "../../interfaces/response/CharacterRecordSheetResponseInterface";
import {Pronoun} from "../../enums/Pronoun";
import {App} from "obsidian";
import {ResponseType} from "../../enums/ResponseType";
import {ContentInterface} from "../../interfaces/ContentInterface";

export class ResponseCharacterRecordSheet extends AbstractResponse implements CharacterRecordSheetResponseInterface {
	public link: ContentInterface;
	public name: string;
	public imgSrc: string|null;
	public imgWidth: number;
	public imgHeight: number;
	public goals: ContentInterface|null;
	public death: Date|null;
	public age: number|null;
	public pronoun: Pronoun|null;
	public synopsis: ContentInterface;

	constructor(
		app: App,
	) {
		super(app);
		this.responseType = ResponseType.CharacterRecordSheet;
	}
}
