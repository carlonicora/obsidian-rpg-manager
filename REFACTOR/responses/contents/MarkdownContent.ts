import {Component, MarkdownRenderer} from "obsidian";
import {AbstractContent} from "../abstracts/AbstractContent";

export class MarkdownContent extends AbstractContent {
	public content: string;

	public fillContent(
		container: HTMLElement|undefined,
		sourcePath: string,
	): void {
		if (container === undefined) return;

		MarkdownRenderer.renderMarkdown(
			(this.content != null ? this.content : '&nbsp;'),
			container,
			sourcePath,
			null as unknown as Component,
		);
	}
}
