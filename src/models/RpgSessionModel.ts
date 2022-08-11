import {AbstractModel} from "../abstracts/AbstractModel";
import {SceneData, SceneList} from "../data/SceneData";
import {viewType} from "../factories/RpgViewFactory";

export class RpgSessionModel extends AbstractModel {
	public async render() {
		this.sceneList();
	}

	async sceneList() {
		const data = new SceneList(this.campaign);

		const current = this.dv.current();
		if (
			current !== undefined &&
			current.ids.session != null
		) {
			const scenes = this.dv.pages("#scene")
				.where(page =>
					page.file.folder !== "Templates" &&
					page.ids !== undefined &&
					page.ids.session != undefined &&
					page.ids.scene != undefined &&
					page.ids.session === current.ids.session
				)
				.sort(page => page.ids.scene);

			scenes.forEach((scene) => {
				data.add(
					new SceneData(
						this.functions,
						scene,
					)
				)
			});

			this.writeData(data, viewType.SceneList);
		}

	}
}
