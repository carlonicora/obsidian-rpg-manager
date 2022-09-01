import {Pronoun} from "../../enums/Pronoun";
import {GenericDataInterface} from "./GenericDataInterface";

export interface GenericSynopsisDataInterface extends GenericDataInterface {
	synopsis: string;
	death: string;
	isCharacter: boolean;
	title: string|null;
	pronoun: Pronoun|null;
}
