import {AbstractListView} from "../../abstracts/AbstractListView";
import {SessionListInterface} from "../../data/SessionData";

export class SessionListView extends AbstractListView {
	async render(
		data: SessionListInterface
	): Promise<void>
	{
		this.dv.span("## Sessions");

		this.dv.table(["&#35;", "Session", "Synopsis", "Date", "Play Date"],
			data.elements
				.map(session => [
					session.id,
					session.link,
					session.synopsis,
					session.date,
					session.irl,
				])
		);

		this.spacer();
	}
}
