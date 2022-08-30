import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {CharacterDataInterface, PronounFactory} from "../data/CharacterData";

export class CharacterInfoView extends AbstractSingleView {
	async render(
		data: CharacterDataInterface
	): Promise<void> {
		const content = [];
		content.push(["Status", (data.isDead ? "Dead" : "Alive")]);
		content.push(["Pronoun", (data.pronoun != null ? PronounFactory.read(data.pronoun) : '<span class="rpgm-missing">pronoun missing in frontmatter</span>')]);

		if (data.age !== "") {
			content.push([(data.isDead ? "Age at Death" : "Age"), (data.age !== "" ? data.age : '<span class="rpgm-missing">Dob or campaign date missing</span>')]);
		}

		content.push(["Goals", (data.goals ? data.goals : '<span class="rpgm-missing">Goals missing</span>')]);

		this.dv.table(["**" + data.name + "**", ""], content);

		this.spacer();
	}
}
