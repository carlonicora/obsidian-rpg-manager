import {AbstractSingleView} from "../abstracts/AbstractSingleView";
import {SceneDataInterface} from "../data";
import {Component, MarkdownRenderer} from "obsidian";

export class SceneActionView  extends AbstractSingleView {
	async render(
		data: SceneDataInterface
	): Promise<void> {
		const goalDiv = this.container.createDiv();
		goalDiv.addClass('rpgm-scene-goal');

		const goalTitle = goalDiv.createDiv();
		goalTitle.addClass('title');
		goalTitle.innerText = 'Scene Goal';

		MarkdownRenderer.renderMarkdown(
			(data.synopsis !== '' ? data.synopsis : '==Missing Scene Synopsis (Goal)=='),
			goalDiv,
			this.dv.currentFilePath,
			null as unknown as Component,
		);

		const actionDiv = this.container.createDiv();
		actionDiv.addClass('rpgm-scene-action');

		const actionTitle = actionDiv.createDiv();
		actionTitle.addClass('title');
		actionTitle.innerText = 'Player Character\'s Action';

		MarkdownRenderer.renderMarkdown(
			(data.action !== '' ? data.action : '==Missing Scene Action=='),
			actionDiv,
			this.dv.currentFilePath,
			null as unknown as Component,
		);
	}
}
