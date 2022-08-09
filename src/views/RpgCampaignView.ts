import {RpgAbstractView} from "../abstracts/RpgAbstractView";

export class RpgCampaignView extends RpgAbstractView {
	public async render() {
		this.renderer.adventureList();
		this.renderer.sessionList();
		this.renderer.characterList();
	}
}
