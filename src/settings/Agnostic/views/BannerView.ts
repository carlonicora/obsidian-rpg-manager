import {AbstractView} from "../../../abstracts/AbstractView";
import {BannerResponseInterface} from "../../../interfaces/response/BannerResponseInterface";
import {RpgFunctions} from "../../../RpgFunctions";

export class BannerView extends AbstractView {
	public render(
		container: HTMLElement,
		data: BannerResponseInterface,
	): void {
		if (data.image !== null) {
			const bannerContainer = container.createDiv({cls: 'rpg-container'});

			const header = bannerContainer.createDiv({cls: 'rpgm-header'});
			header.style.backgroundImage = 'url(\'' + data.image + '\')';

			const overlay = header.createDiv({cls: 'rpgm-header-overlay'});
			overlay.createDiv({cls: 'rpgm-header-title', text: data.title});

			overlay.createDiv({cls: 'rpgm-campaign-name', text: (data.subtitle != null ? data.subtitle : '')});
			overlay.createDiv({cls: 'rpgm-current-date', text: (data.date !== null ? data.date : "")});
		} else {
			container.createEl('h1', {text: data.title});
		}
	}
}
