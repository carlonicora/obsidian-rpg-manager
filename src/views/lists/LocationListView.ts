import {AbstractListView} from "../../abstracts/AbstractListView";
import {LocationListInterface} from "../../data/LocationData";

export class LocationListView extends AbstractListView {
	async render(
		data: LocationListInterface,
		title: string|null=null,
	): Promise<void>
	{
		this.dv.span('## ' + (title == null ? 'Locations' : title));

		this.dv.table(["", "Name", "Synopsis"],
			data.elements
				.map(character => [
					character.image,
					character.link,
					character.synopsis,
				])
		);

		this.spacer();
	}
}
