import {App, Component, MarkdownRenderer, Modal, TFile} from "obsidian";

export class MisconfiguredDataModal extends Modal {
	constructor(
		app: App,
		private misconfiguredTags: Map<TFile, string>,
	) {
		super(app);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();

		contentEl.createEl('h2', {text: 'RPG Manager misconfigured tags'});
		contentEl.createEl('p', {text: 'One or more of the tags that define an outline or an element are not correctly misconfigured and can\'t be read!'});
		contentEl.createEl('p', {text: 'Please double check the errors and correct them.'});
		const listEl = contentEl.createEl('ul');

		this.misconfiguredTags.forEach((error: string, file: TFile) => {
			const listItemEl = listEl.createEl('li');
			//listItemEl.textContent = file.name + ' ' + error;

			MarkdownRenderer.renderMarkdown(
				'**' + file.basename +'**\n' + error,
				listItemEl,
				file.path,
				null as unknown as Component,
			);
		});

		const actionEl = contentEl.createEl('button', {text: 'Open all the misconfigured files'});
		actionEl.addEventListener("click", () => {
			this.misconfiguredTags.forEach((error: string, file: TFile) => {
				const leaf = app.workspace.getLeaf(true);
				leaf.openFile(file);
			});
			this.close();
		});
	}

	onClose() {
		super.onClose();

		const {contentEl} = this;
		contentEl.empty();
	}
}
