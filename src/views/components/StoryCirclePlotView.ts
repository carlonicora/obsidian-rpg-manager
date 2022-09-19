import {AbstractView} from "../../abstracts/AbstractView";
import {StoryCirclePlotResponseInterface} from "../../interfaces/response/StoryCirclePlotResponseInterface";

export class StoryCirclePlotView extends AbstractView {
	public render(
		container: HTMLElement,
		data: StoryCirclePlotResponseInterface,
	): void {
		const titleEl = container.createEl('h2');
		titleEl.textContent = 'Story Circle Plot';

		const plotEl = container.createDiv({cls: 'rpgm-plot-container'});

		const youEl = plotEl.createEl('p');
		data.you.fillContent(youEl, this.sourcePath);

		const needEl = plotEl.createEl('p');
		data.need.fillContent(needEl, this.sourcePath);

		const goEl = plotEl.createEl('p');
		data.go.fillContent(goEl, this.sourcePath);

		const searchEl = plotEl.createEl('p');
		data.search.fillContent(searchEl, this.sourcePath);

		const findEl = plotEl.createEl('p');
		data.find.fillContent(findEl, this.sourcePath);

		const takeEl = plotEl.createEl('p');
		data.take.fillContent(takeEl, this.sourcePath);

		const returnEl = plotEl.createEl('p');
		data.return.fillContent(returnEl, this.sourcePath);

		const changeEl = plotEl.createEl('p');
		data.change.fillContent(changeEl, this.sourcePath);
	}

}
