import {Pronoun} from "../../../enums/Pronoun";
import {DateInterface} from "../../../../services/date/interfaces/DateInterface";

export interface CharacterDataInterface {
	get death(): DateInterface | undefined;
	get dob(): DateInterface | undefined;
	get goals(): string | undefined;
	get pronoun(): Pronoun | undefined;
}
