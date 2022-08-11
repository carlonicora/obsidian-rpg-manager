import {AbstractListView} from "../../abstracts/AbstractListView";
import {AdventureListInterface} from "../../data/AdventureData";

export class AdventureListView extends AbstractListView {
	async render(
		data: AdventureListInterface
	): Promise<void>
	{
		this.dv.span("## Adventures");

		this.dv.table(["", "Adventure", "Synopsis"],
			data.elements
				.map(adventure => [
					adventure.id,
					adventure.link,
					adventure.synopsis,
				])
		);

		this.spacer();
	}
}
