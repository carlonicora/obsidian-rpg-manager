import {AbstractModel} from "../abstracts/AbstractModel";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {SceneData} from "../data";

export class SceneNavigationModel extends AbstractModel {
	public async render() {
		this.action();
		this.sceneNavigation();
	}

	protected action(
	){
		const scene = this.io.getScene();

		if (scene !== null) {
			this.writeData(
				scene,
				viewType.SceneAction,
			)
		}
	}

	private async sceneNavigation(
	) {
		const adventureId = this.api.getGrandParentId(this.current.tags, this.api.settings.sceneTag);
		const sessionId = this.api.getParentId(this.current.tags, this.api.settings.sceneTag);
		const sceneId = this.api.getId(this.current.tags, this.api.settings.sceneTag);

		const adventure = this.io.getAdventure(adventureId);
		const session = this.io.getSession(adventureId, sessionId);
		const previousScene = this.io.getScene(adventureId, sessionId, sceneId-1);
		const nextScene = this.io.getScene(adventureId, sessionId, sceneId+1);

		const data = new SceneData(
			this.api,
			this.current,
			session,
			adventure,
			previousScene,
			nextScene,
			this.campaign,
		);

		const view = RpgViewFactory.createSingle(viewType.SceneNavigation, this.dv);
		view.render(data);
	}
}
