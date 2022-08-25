import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {CharacterDataInterface, PronounFactory} from "../data/CharacterData";

export class CharacterInfoView extends AbstractSingleView {
	async render(
		data: CharacterDataInterface
	): Promise<void> {
		this.dv.table(["**" + data.name + "**", ""], [
			["Status", (data.isDead ? "Dead" : "Alive")],
			["Pronoun", (data.pronoun != null ? PronounFactory.read(data.pronoun) : '<span class="rpgm-missing">pronoun missing in frontmatter</span>')],
			[(data.isDead ? "Age at Death" : "Age"), (data.age !== "" ? data.age : '<span class="rpgm-missing">Dob or campaign date missing</span>')],
			["Goals", (data.goals ? data.goals : '<span class="rpgm-missing">Goals missing</span>')],
		]);

		this.spacer();
	}
}
