import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {CharacterDataInterface, PronounFactory} from "../data/CharacterData";

export class CharacterInfoView extends AbstractSingleView {
	async render(
		data: CharacterDataInterface
	): Promise<void> {
		const content = [];
		content.push(["Status", (data.isDead ? "Dead" : "Alive")]);

		if (data.pronoun != null) {
			content.push(["Pronoun", PronounFactory.read(data.pronoun)]);
		}

		if (data.age !== "") {
			content.push([(data.isDead ? "Age at Death" : "Age"), data.age]);
		}

		content.push(["Goals", (data.goals ? data.goals : '<span class="rpgm-missing">Goals missing</span>')]);

		this.dv.table(["**" + data.name + "**", ""], content);

		this.spacer();
	}
}
