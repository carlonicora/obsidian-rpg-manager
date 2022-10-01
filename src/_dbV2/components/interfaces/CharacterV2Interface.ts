import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";
import {Pronoun} from "../../../enums/Pronoun";

export interface CharacterV2Interface extends ComponentV2Interface {
	get dob(): Date | undefined;
	get death(): Date | undefined;
	get goals(): string | undefined;
	get pronoun(): Pronoun | undefined;

	get age(): number|undefined;
	get isDead(): boolean;
}
