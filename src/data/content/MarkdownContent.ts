import {Component, MarkdownRenderer} from "obsidian";
import {AbstractContent} from "../../abstracts/AbstractContent";

export class MarkdownContent extends AbstractContent {
	public content: string;

	public fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void {
		if (this.content != null){
			MarkdownRenderer.renderMarkdown(
				this.content,
				container,
				sourcePath,
				null as unknown as Component,
			);
		} else {
			container.textContent = '';
		}
	}
}
