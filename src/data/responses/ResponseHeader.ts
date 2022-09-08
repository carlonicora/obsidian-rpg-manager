import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {HeaderResponseInterface} from "../../interfaces/response/HeaderResponseInterface";
import {Pronoun} from "../../enums/Pronoun";
import {App} from "obsidian";
import {ResponseType} from "../../enums/ResponseType";
import {ContentInterface} from "../../interfaces/ContentInterface";

export class ResponseHeader extends AbstractResponse implements HeaderResponseInterface {
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
	public clueFound: ContentInterface|null;
	public address: string|null;
	public date: Date|null;
	public synopsisTitle: string|null;

	constructor(
		app: App,
	) {
		super(app);
		this.responseType = ResponseType.Header;
	}
}
