import {AbstractListView} from "../../abstracts/AbstractListView";
import {FactionListInterface} from "../../data/FactionData";

export class FactionListView extends AbstractListView {
	async render(
		data: FactionListInterface
	): Promise<void>
	{
		this.dv.span("## Factions");

		this.dv.table(["", "Faction", "Synopsis"],
			data.elements
				.map(clue => [
					clue.image,
					clue.link,
					clue.synopsis,
				])
		);

		this.spacer();
	}
}
