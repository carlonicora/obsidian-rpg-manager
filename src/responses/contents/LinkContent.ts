import {Component, MarkdownRenderer} from "obsidian";
import {AbstractContent} from "../abstracts/AbstractContent";

export class LinkContent extends AbstractContent {
	public content: any;

	public fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void {
		if (this.content != null){
			MarkdownRenderer.renderMarkdown(
				this.content.toString(),
				container,
				sourcePath,
				null as unknown as Component,
			);
		} else {
			container.textContent = '';
		}
	}
}
