import {App, Component, MarkdownRenderer, Modal, TFile} from "obsidian";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";

export class MisconfiguredDataModal extends Modal {
	constructor(
		app: App,
		private misconfiguredTags: Map<TFile, RpgErrorInterface>|undefined,
		private singleError: RpgErrorInterface|undefined = undefined,
	) {
		super(app);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();

		contentEl.createEl('h1', {cls: 'error', text: 'Error'});

		if (this.misconfiguredTags !== undefined) {
			contentEl.createEl('p', {text: 'One or more of the tags that define an outline or an element are not correctly misconfigured and can\'t be read!'});
			contentEl.createEl('p', {text: 'Please double check the errors and correct them.'});
			const listEl = contentEl.createEl('ul');

			this.misconfiguredTags.forEach((error: RpgErrorInterface, file: TFile) => {
				const listItemEl = listEl.createEl('li');

				MarkdownRenderer.renderMarkdown(
					'**' + file.basename + '**\n' + error.showErrorMessage(),
					listItemEl,
					file.path,
					null as unknown as Component,
				);
			});

			const actionEl = contentEl.createEl('button', {text: 'Open all the misconfigured files'});
			actionEl.addEventListener("click", () => {
				(this.misconfiguredTags || new Map<TFile, RpgErrorInterface>()).forEach((error: RpgErrorInterface, file: TFile) => {
					const leaf = app.workspace.getLeaf(true);
					leaf.openFile(file);
				});
				this.close();
			});
		}

		if (this.singleError !== undefined){
			const errorEl = contentEl.createEl('p');

			MarkdownRenderer.renderMarkdown(
				this.singleError.showErrorMessage(),
				errorEl,
				'',
				null as unknown as Component,
			);
		}
	}

	onClose() {
		super.onClose();

		const {contentEl} = this;
		contentEl.empty();
	}
}
