import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgSceneView extends RpgAbstractView {
	public async render() {
		this.renderer.sceneNavigator();
		this.renderer.sceneLocations();
		this.renderer.sceneCharacters();
		this.renderer.sceneClues();
	}
}
