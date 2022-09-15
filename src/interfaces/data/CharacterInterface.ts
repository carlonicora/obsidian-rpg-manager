import {RecordInterface} from "../database/RecordInterface";
import {Pronoun} from "../../enums/Pronoun";

export interface CharacterInterface extends RecordInterface {
	dob: Date|null;
	death: Date|null;
	goals: string|null;
	pronoun: Pronoun|null;

	get age(): number|null;
	get isDead(): boolean;
}
