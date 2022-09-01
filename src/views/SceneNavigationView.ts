import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {SceneDataInterface} from "../data/SceneData";

export class SceneNavigationView extends AbstractSingleView {
	async render(
		data: SceneDataInterface
	): Promise<void> {
		const tableElements = [];
		tableElements.push(["Adventure", data.adventure != undefined ? data.adventure.link : '']);
		tableElements.push(["Session", data.session != undefined ? data.session.link : '']);

		if (data.previousScene != undefined){
			tableElements.push(["<< Previous Scene", data.previousScene.link]);
		}

		if (data.nextScene != undefined){
			tableElements.push(["Next Scene >>", data.nextScene.link]);
		}

		const table = (<any>this.dv).markdownTable(["Campaign", "" + data.campaign.link],tableElements);

		this.dv.paragraph(table);

		this.spacer();
	}
}
