import {AbstractModel} from "../abstracts/AbstractModel";

export class RpgCampaignModel extends AbstractModel {
	public async render() {
		this.renderer.adventureList();
		this.renderer.sessionList();
		this.renderer.characterList();
	}
}
