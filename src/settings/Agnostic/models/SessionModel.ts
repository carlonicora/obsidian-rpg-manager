import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class SessionModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
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
			ViewType.SceneList
		);
	}
	 */
}
