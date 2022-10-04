import {Pronoun} from "../../../enums/Pronoun";

export interface CharacterDataInterface {
	get death(): Date | undefined;
	get dob(): Date | undefined;
	get goals(): string | undefined;
	get pronoun(): Pronoun | undefined;
}
