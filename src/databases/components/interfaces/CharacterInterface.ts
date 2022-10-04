import {ComponentInterface} from "../../interfaces/ComponentInterface";
import {Pronoun} from "../../enums/Pronoun";
import {CharacterDataInterface} from "./data/CharacterDataInterface";

export interface CharacterInterface extends ComponentInterface, CharacterDataInterface {
	get dob(): Date | undefined;
	get death(): Date | undefined;
	get goals(): string | undefined;
	get pronoun(): Pronoun | undefined;

	get age(): number|undefined;
	get isDead(): boolean;
}
