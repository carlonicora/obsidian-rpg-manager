import {AbstractElement} from "../../../../managers/viewsManager/abstracts/AbstractElement";
import {RunElementDataInterface} from "./interfaces/RunElementDataInterface";
import {RunningTimeService} from "../../RunningTimeService";

export class RunElement extends AbstractElement {
	render(
		data: RunElementDataInterface,
		containerEl: HTMLElement,
	) {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});
		const startStopEl = contentEl.createEl('a', {href: '#', text: (data.values.isRunning ? 'stop' : 'start')});

		startStopEl.addEventListener('click', (e) => {
			e.preventDefault();
			if (data.values.isRunning) {
				this.api.service(RunningTimeService).stopScene(data.values.scene);
			} else {
				this.api.service(RunningTimeService).startScene(data.values.scene);
			}
		});
	}
}
