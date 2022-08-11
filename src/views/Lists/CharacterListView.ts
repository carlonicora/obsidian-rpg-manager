import {AbstractListView} from "../../abstracts/AbstractListView";
import {CharacterListInterface} from "../../data/CharacterData";

export class CharacterListView extends AbstractListView {
	async render(
		data: CharacterListInterface
	): Promise<void>
	{
		this.dv.span("## Characters");

		this.dv.table(["", "Name", "Age", "Synopsis"],
			data.elements
				.map(character => [
					character.image,
					character.link,
					character.age,
					character.synopsis,
				])
		);

		this.spacer();
	}
}
