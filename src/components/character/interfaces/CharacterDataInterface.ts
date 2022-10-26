import {Pronoun} from "../../../services/pronounService/enums/Pronoun";
import {DateInterface} from "../../../../REFACTOR/services/dateService/interfaces/DateInterface";

export interface CharacterDataInterface {
	get death(): DateInterface | undefined;
	get dob(): DateInterface | undefined;
	get goals(): string | undefined;
	get pronoun(): Pronoun | undefined;
}
