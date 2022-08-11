import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";

export class SessionModel extends AbstractModel {
	public async render() {
		this.sceneList();
	}

	async sceneList(
	) {
		this.writeList(
			this.io.getSceneList(),
			viewType.SceneList
		);
	}
}
