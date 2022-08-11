import {AbstractListView} from "../../abstracts/AbstractListView";
import {EventListInterface} from "../../data/EventData";

export class EventListView extends AbstractListView {
	async render(
		data: EventListInterface
	): Promise<void>
	{
		this.dv.span("## Events");

		this.dv.table(["", "Name", "Date", "Synopsis"],
			data.elements
				.map(event => [
					event.image,
					event.link,
					event.date,
					event.synopsis,
				])
		);

		this.spacer();
	}
}
