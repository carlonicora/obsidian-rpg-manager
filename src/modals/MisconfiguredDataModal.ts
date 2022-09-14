import {App, Component, MarkdownRenderer, Modal} from "obsidian";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";

export class MisconfiguredDataModal extends Modal {
	constructor(
		app: App,
		private misconfiguredTags: Map<RpgDataInterface, RpgErrorInterface>|undefined,
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

			this.misconfiguredTags.forEach((error: RpgErrorInterface, data: RpgDataInterface) => {
				const listItemEl = listEl.createEl('li');

				MarkdownRenderer.renderMarkdown(
					'**' + data.name + '**\n' + error.showErrorMessage(),
					listItemEl,
					data.path,
					null as unknown as Component,
				);
			});

			const actionEl = contentEl.createEl('button', {text: 'Open all the misconfigured files'});
			actionEl.addEventListener("click", () => {
				(this.misconfiguredTags || new Map<RpgDataInterface, RpgErrorInterface>()).forEach((error: RpgErrorInterface, data: RpgDataInterface) => {
					const leaf = app.workspace.getLeaf(true);
					leaf.openFile(data.file);
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
