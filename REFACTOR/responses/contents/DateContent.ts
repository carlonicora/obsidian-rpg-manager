import {AbstractContent} from "../abstracts/AbstractContent";
import {Component, MarkdownRenderer} from "obsidian";

export class DateContent extends AbstractContent {
	public content: string;

	public fillContent(
		container: HTMLElement|undefined,
		sourcePath: string,
	): void {
		if (container === undefined) return;

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
