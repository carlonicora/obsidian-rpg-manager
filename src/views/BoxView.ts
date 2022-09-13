import {AbstractView} from "../abstracts/AbstractView";
import {Component, MarkdownRenderer} from "obsidian";
import {BoxResponseInterface} from "../interfaces/response/BoxResponseInterface";

export class BoxView extends AbstractView {
	public render(
		container: HTMLElement,
		data: BoxResponseInterface,
	): void {
		const boxDiv = container.createDiv();
		boxDiv.addClass('rpgm-box');

		boxDiv.addClass(data.colour);

		const boxTitle = boxDiv.createDiv();
		boxTitle.addClass('title');
		boxTitle.innerText = data.title;

		MarkdownRenderer.renderMarkdown(
			(data.content != null && data.content !== '' ? data.content : '<span class="rpgm-missing">Missing ' + data.title + '</span>'),
			boxDiv,
			this.sourcePath,
			null as unknown as Component,
		);
	}
}
