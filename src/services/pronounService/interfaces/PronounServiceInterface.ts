import {Pronoun} from "../enums/Pronoun";

export interface PronounServiceInterface {
	createPronoun(
		readablePronoun: string,
	): Pronoun;

	createReadablePronoun(
		pronoun: Pronoun,
	): string;

	readPronoun(
		pronoun: Pronoun,
	): string;
}
