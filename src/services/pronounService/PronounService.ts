import {Pronoun} from "./enums/Pronoun";
import {PronounServiceInterface} from "./interfaces/PronounServiceInterface";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";

export class PronounService extends AbstractService implements PronounServiceInterface, ServiceInterface {
	public createPronoun(
		readablePronoun: string,
	): Pronoun {
		readablePronoun = readablePronoun.toLowerCase();

		return Pronoun[readablePronoun as keyof typeof Pronoun];
	}

	createReadablePronoun(
		pronoun: Pronoun,
	): string {
		return Pronoun[pronoun].toString().toLowerCase();
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
