import {ComponentInterface} from "../database/ComponentInterface";
import {Pronoun} from "../../enums/Pronoun";

export interface CharacterInterface extends ComponentInterface {
	dob: Date|null;
	death: Date|null;
	goals: string|null;
	pronoun: Pronoun|null;

	get age(): number|null;
	get isDead(): boolean;
}
