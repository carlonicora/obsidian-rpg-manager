import {RpgDataInterface} from "./RpgDataInterface";
import {RpgElementDataInterface} from "./RpgElementDataInterface";
import {Pronoun} from "../../enums/Pronoun";

export interface CharacterInterface extends RpgDataInterface, RpgElementDataInterface {
	dob: Date|null;
	death: Date|null;
	goals: string|null;
	pronoun: Pronoun|null;

	get age(): number|null;
	get isDead(): boolean;
}
