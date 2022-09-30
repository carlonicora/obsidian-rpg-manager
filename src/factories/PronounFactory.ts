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
				case 'ae':
					response = Pronoun.ae;
					break;
				case 'e':
					response = Pronoun.e;
					break;
				case 'per':
					response = Pronoun.per;
					break;
				case 've':
					response = Pronoun.ve;
					break;
				case 'ze':
					response = Pronoun.ze;
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
				return 'They / Them / Themself';
				break;
			case Pronoun.she:
				return 'She / Her / Herself';
				break;
			case Pronoun.he:
				return 'He / Him / Himself';
				break;
			case Pronoun.it:
				return 'It / Its / Itself';
				break;
			case Pronoun.ae:
				return '(f)Ae / (f)Aer / (f)Aerself';
				break;
			case Pronoun.e:
				return 'E(Ey) / Em / Eirelf';
				break;
			case Pronoun.per:
				return 'Per / Per / Perself';
				break;
			case Pronoun.ve:
				return 'Ve / Ver / Verself';
				break;
			case Pronoun.xe:
				return 'Xe / Xem / Xemself';
				break;
			case Pronoun.ze:
				return 'Ze(Zie) / Hir / Hirself';
				break;
		}
	}
}
