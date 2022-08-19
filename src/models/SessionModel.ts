import {AbstractModel} from "../abstracts/AbstractModel";
import {viewType} from "../factories/RpgViewFactory";
import {DataType} from "../io/IoData";

export class SessionModel extends AbstractModel {
	public async render() {
		this.sceneList();
	}

	async sceneList(
	) {
		this.writeList(
			this.io.getSceneList(
				this.api.getTagId(this.current.tags, DataType.Adventure),
				this.api.getTagId(this.current.tags, DataType.Session),
			),
			viewType.SceneList
		);
	}
}
