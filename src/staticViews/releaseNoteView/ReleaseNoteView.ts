import {Component, MarkdownRenderer} from "obsidian";
import {AbstractStaticView} from "../../managers/staticViewsManager/abstracts/AbstractStaticView";
import {ReleaseNoteFetcher} from "../../fetchers/releaseNoteFetcher/ReleaseNoteFetcher";
import {StaticViewType} from "../../managers/staticViewsManager/enums/StaticViewType";

export class ReleaseNoteView extends AbstractStaticView{
	protected viewType: string = StaticViewType.ReleaseNote.toString();
	protected displayText = 'RPG Manager Release Notes';
	public icon = 'd20';

	public initialise(
		params: any[],
	): void {
	}

	public async render(
	): Promise<void> {
		this.rpgmContentEl.empty();

		const releaseNotes = await this.api.service(ReleaseNoteFetcher).fetchMarkdown();

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
			this.app.workspace.detachLeavesOfType(StaticViewType.ReleaseNote.toString());
		});
	}
}
