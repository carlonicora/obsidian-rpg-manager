import {AbstractModel} from "../abstracts/AbstractModel";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {SceneData} from "../data";
import {DataType} from "../io/IoData";

export class SceneNavigationModel extends AbstractModel {
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
				viewType.SceneAction,
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

		const view = RpgViewFactory.createSingle(viewType.SceneNavigation, this.dv);
		view.render(data);
	}
}
