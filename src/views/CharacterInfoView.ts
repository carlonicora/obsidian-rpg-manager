import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {CharacterDataInterface} from "../data/CharacterData";

export class CharacterInfoView extends AbstractSingleView {
	async render(
		data: CharacterDataInterface
	): Promise<void> {
		this.dv.table(["**" + data.name + "**", ""], [
			["Status", (data.isDead ? "Dead" : "Alive")],
			[(data.isDead ? "Age at Death" : "Age"), (data.age !== "" ? data.age : "==Dob or campaign date missing==" )],
			["Goals", (data.goals ? data.goals : "==Goals missing==")],
		]);

		this.spacer();
	}
}
