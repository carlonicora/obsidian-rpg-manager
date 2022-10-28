import {AbstractElement} from "../../abstracts/AbstractElement";
import {TextElementInterface} from "../interfaces/TextElementInterface";
import {Component, MarkdownRenderer} from "obsidian";

export abstract class AbstractTextElement extends AbstractElement {
	protected renderText(
		data: TextElementInterface,
		containerEl: HTMLElement,
		isLong: boolean,
	): void {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-' + (isLong ? 'long' : 'short') + ' clearfix'});

		this.createTitle(data.title, infoEl, data.editableKey);

		let contentClass = 'rpg-manager-header-container-info-data-container-content';

		if (data.editableKey !== undefined)
			contentClass = 'rpg-manager-header-container-info-data-container-content-editable';

		const contentEl = infoEl.createDiv({cls: contentClass + ' clearfix'});

		MarkdownRenderer.renderMarkdown(
			data.values,
			contentEl,
			'',
			null as unknown as Component,
		);
	}
}
