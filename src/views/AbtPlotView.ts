import {AbstractView} from "../abstracts/AbstractView";
import {AbtPlotResponseInterface} from "../interfaces/response/AbtPlotResponseInterface";

export class AbtPlotView extends AbstractView {
	public render(
		container: HTMLElement,
		data: AbtPlotResponseInterface,
	): void {
		const titleEl = container.createEl('h2');
		titleEl.textContent = 'ABT Plot';

		const plotEl = container.createDiv({cls: 'rpgm-plot-container'});

		const needEl = plotEl.createEl('p');
		data.need.fillContent(needEl, this.sourcePath);

		const andEl = plotEl.createEl('p');
		data.and.fillContent(andEl, this.sourcePath);

		const butEl = plotEl.createEl('p');
		data.but.fillContent(butEl, this.sourcePath);

		const thereforeEl = plotEl.createEl('p');
		data.therefore.fillContent(thereforeEl, this.sourcePath);
	}

}
