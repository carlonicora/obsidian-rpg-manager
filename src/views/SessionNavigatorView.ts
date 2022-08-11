import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {SessionDataInterface} from "../data/SessionData";

export class SessionNavigatorView extends AbstractSingleView {
	async render(
		data: SessionDataInterface
	): Promise<void> {
		const tableElements = [];

		tableElements.push(["Adventure", data.adventure ? data.adventure.link : '']);
		tableElements.push(["Introduction", "[[#Introduction]]"]);
		tableElements.push(["ABT Plot", "[[#ABT Plot]]"]);
		tableElements.push(["Story Circle Plot", "[[#Story Circle Plot]]"]);
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
