import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgSceneModel extends AbstractModel {
	public async render() {
		this.renderer.sceneNavigator();
		this.renderer.sceneLocations();
		this.renderer.sceneCharacters();
		this.renderer.sceneClues();
	}
}
