import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {SessionDataInterface} from "../data/SessionData";

export class SessionNavigatorView extends AbstractSingleView {
	async render(
		data: SessionDataInterface
	): Promise<void> {
		const tableElements = [];

		tableElements.push(["Adventure", data.adventure ? data.adventure.link : '']);

		/*
		const query = this.api.settings.noteTag + '/' + data.campaign?.id + '/' + data.adventureId + '/' + data.id;
		const pages = this.dv.pages(query);
		if (pages.length === 1){
		} else {
		}
		 */
		tableElements.push(["Notes", "[[Notes - " + data.name + "]]"]);

		if (data.previousSession != null){
			tableElements.push(["<< Previous Session", data.previousSession.link]);
		}

		if (data.nextSession != null){
			tableElements.push(["Next Session >>", data.nextSession.link]);
		}

		//@ts-ignore
		const table = this.dv.markdownTable(["Campaign", "" + data.campaign.link],tableElements);

		this.dv.paragraph(table);

		this.spacer();
	}
}
