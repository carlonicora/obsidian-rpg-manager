import {Pronoun} from "../../enums/Pronoun";

export interface PronounFactoryInterface {
	create(
		pronoun: string|null,
	): Pronoun|null;

	readPronoun(
		pronoun: Pronoun
	): string;
}
