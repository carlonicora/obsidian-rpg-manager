import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class SceneNavigationModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
	public async render() {
		this.action();
		this.sceneNavigation();
	}

	protected action(
	){
		const scene = this.io.getScene(
			this.api.getTagId(this.current.tags, DataType.Adventure),
			this.api.getTagId(this.current.tags, DataType.Session),
			this.api.getTagId(this.current.tags, DataType.Scene),
		);

		if (scene !== null) {
			this.writeData(
				scene,
				ViewType.SceneAction,
			)
		}
	}

	private async sceneNavigation(
	) {
		const adventureId = this.api.getTagId(this.current.tags, DataType.Adventure);
		const sessionId = this.api.getTagId(this.current.tags, DataType.Session);
		const sceneId = this.api.getTagId(this.current.tags, DataType.Scene);

		const adventure = this.io.getAdventure(adventureId);
		const session = this.io.getSession(adventureId, sessionId);
		const previousScene = this.io.getScene(adventureId, sessionId, sceneId-1);
		const nextScene = this.io.getScene(adventureId, sessionId, sceneId+1);

		const data = new SceneData(
			this.api,
			this.current,
			this.campaign,
			adventure,
			session,
			previousScene,
			nextScene,
		);

		const view = ViewFactory.createSingle(ViewType.SceneNavigation, this.dv);
		view.render(data);
	}
	 */
}
