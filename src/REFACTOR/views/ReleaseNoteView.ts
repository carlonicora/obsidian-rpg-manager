import {ViewType} from "./enums/ViewType";
import {Component, MarkdownRenderer} from "obsidian";
import {AbstractRpgManagerView} from "../../core/abstracts/AbstractRpgManagerView";
import {MarkdownFetcherInterface} from "../../services/fetchers/interfaces/MarkdownFetcherInterface";
import {ReleaseNoteFetcher} from "../../services/fetchers/ReleaseNoteFetcher";

export class ReleaseNoteView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.ReleaseNote.toString();
	protected displayText = 'RPG Manager Release Notes';
	public icon = 'd20';

	public initialise(
		params: any[],
	): void {
	}

	public async render(
	): Promise<void> {
		this.rpgmContentEl.empty();

		const fetcher = await this.factories.fetchers.create<MarkdownFetcherInterface>(ReleaseNoteFetcher);
		const releaseNotes: string|null|undefined = await fetcher.fetchMarkdown();

		if (releaseNotes != null) {
			MarkdownRenderer.renderMarkdown(
				releaseNotes,
				this.rpgmContentEl,
				'',
				null as unknown as Component,
			);
		}

		const closeButtonEl = this.contentEl.createEl('button', {text: 'Close the release notes'});
		closeButtonEl.addEventListener("click", () => {
			this.app.workspace.detachLeavesOfType(ViewType.ReleaseNote.toString());
		});
	}
}
