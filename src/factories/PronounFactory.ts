import {Pronoun} from "../enums/Pronoun";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {PronounFactoryInterface} from "../interfaces/factories/PronounFactoryInterface";

export class PronounFactory extends AbstractFactory implements PronounFactoryInterface{
	public create(
		pronoun: string|null,
	): Pronoun|null {

		let response: Pronoun|null = null;

		if (pronoun != null) {
			switch(pronoun.toLowerCase()) {
				case 't':
				case 'they':
					response = Pronoun.they;
					break;
				case 's':
				case 'she':
					response = Pronoun.she;
					break;
				case 'h':
				case 'he':
					response = Pronoun.he;
					break;
				case 'i':
				case 'it':
					response = Pronoun.it;
					break;
				default:
					response = null;
					break;
			}
		}

		return response;
	}

	public readPronoun(
		pronoun: Pronoun
	): string {
		switch (pronoun) {
			case Pronoun.they:
				return 'They/Them';
				break;
			case Pronoun.she:
				return 'She/Her';
				break;
			case Pronoun.he:
				return 'He/Him';
				break;
			case Pronoun.it:
				return 'It/Its';
				break;
		}
	}
}
