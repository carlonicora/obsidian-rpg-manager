import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {CampaignInterface} from "../interfaces/CampaignInterface";

export class CampaignHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: CampaignInterface;

	public render(
	): void {
		this.addTitle();

		if (this.api.settings.usePlotStructures)
			this.addPlot();
	}

	protected addTitle(
	): void {
		if (this.model.images.length == 0) {
			super.addTitle();
		} else {
			const titleOverlayEl: HTMLDivElement = this.titleContainerEl.createDiv({cls: 'rpg-manager-header-container-title-overlay'});
			const titleEl: HTMLDivElement = titleOverlayEl.createDiv({cls: 'rpg-manager-header-container-title-name'});
			titleEl.textContent = this.model.file.basename;

			this.titleContainerEl.addClass('rpg-manager-header-container-title-overlay');
			this.titleContainerEl.style.backgroundImage = 'url(\'' + this.model.images[0].src + '\')';
		}
	}
}
