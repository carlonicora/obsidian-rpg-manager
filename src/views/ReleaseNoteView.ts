import {AbstractView} from "../abstracts/AbstractView";
import {ViewType} from "../enums/ViewType";
import {Component, MarkdownRenderer} from "obsidian";
import {releaseNotes} from "../ReleaseNotes";

export class ReleaseNoteView extends AbstractView {
	protected viewType: string = ViewType.ReleaseNote.toString();
	protected displayText = 'RPG Manager Release Notes';
	public icon = 'd20';

	public initialise(
		params: Array<any>,
	): void {
	}

	public async render(
	): Promise<void> {
		const releaseNotesEl = this.contentEl.createDiv();
		releaseNotesEl.style.fontSize = '0.8em';

		MarkdownRenderer.renderMarkdown(
			releaseNotes,
			releaseNotesEl,
			'',
			null as unknown as Component,
		);

		const closeButtonEl = this.contentEl.createEl('button', {text: 'Close the release notes'});
		closeButtonEl.addEventListener("click", () => {
			this.app.workspace.detachLeavesOfType(ViewType.ReleaseNote.toString());
		});
	}
}