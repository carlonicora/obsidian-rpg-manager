import {ResponseElementInterface} from "./ResponseElementInterface";
import {Pronoun} from "../../enums/Pronoun";
import {ContentInterface} from "../ContentInterface";

export interface CharacterRecordSheetResponseInterface extends ResponseElementInterface {
	link: ContentInterface;
	name: string;
	imgSrc: string|null;
	imgWidth: number;
	imgHeight: number;
	goals: ContentInterface|null;
	death: Date|null;
	age: number|null;
	pronoun: Pronoun|null;
	synopsis: ContentInterface;
}
