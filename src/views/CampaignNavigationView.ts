import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {CampaignDataInterface} from "../data";

export class CampaignNavigationView extends AbstractSingleView {
	async render(
		data: CampaignDataInterface
	): Promise<void> {
		const container = this.dv.container.createDiv({cls: 'rpg-container'});

		const header = container.createDiv({cls: 'rpgm-header'});
		if (data.imageSrc !== null) {
			header.style.backgroundImage = 'url(\'' + data.imageSrc + '\')';
		}

		const overlay = header.createDiv({cls: 'rpgm-header-overlay'});
		overlay.createDiv({cls: 'rpgm-header-title', text: data.name});
	}
}
