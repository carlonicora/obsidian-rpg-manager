import {Pronoun} from "../../enums/Pronoun";

export interface PronounFactoryInterface {
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
