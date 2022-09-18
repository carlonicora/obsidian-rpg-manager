import {App, Component, MarkdownRenderer, Modal, TFile} from "obsidian";
import {RpgErrorInterface} from "../interfaces/RpgErrorInterface";

export class DatabaseErrorModal extends Modal {
	constructor(
		app: App,
		private misconfiguredTags: Map<TFile, RpgErrorInterface>|undefined,
		private singleError: RpgErrorInterface|undefined = undefined,
		private singleErrorFile: TFile|undefined = undefined,
	) {
		super(app);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();

		contentEl.createEl('h1', {cls: 'error', text: 'RPG Manager Error'});

		if (this.misconfiguredTags !== undefined) {
			contentEl.createEl('p', {text: 'One or more of the tags that define an outline or an element are not correctly misconfigured and can\'t be read!'});
			contentEl.createEl('p', {text: 'Please double check the errors and correct them.'});

			this.misconfiguredTags.forEach((error: RpgErrorInterface, file: TFile) => {
				this.addError(error, file);
			});

			/*
			const actionEl = contentEl.createEl('button', {text: 'Open all the misconfigured files'});
			actionEl.addEventListener("click", () => {
				(this.misconfiguredTags || new Map<TFile, RpgErrorInterface>()).forEach((error: RpgErrorInterface, file: TFile) => {
					const leaf = app.workspace.getLeaf(true);
					leaf.openFile(file);
				});
				this.close();
			});
			 */
		}

		if (this.singleError !== undefined){

			if (this.singleError !== undefined && this.singleErrorFile !== undefined) this.addError(this.singleError, this.singleErrorFile);
		}
	}

	private addError(
		error: RpgErrorInterface,
		file: TFile,
	): void {
		const {contentEl} = this;
		const errorEl = contentEl.createEl('div');

		const title = error.getErrorTitle() ?? file.basename;

		MarkdownRenderer.renderMarkdown(
			'**' + title + '**\n' + error.showErrorMessage(),
			errorEl,
			file.path,
			null as unknown as Component,
		);
	}

	onClose() {
		super.onClose();

		const {contentEl} = this;
		contentEl.empty();
	}
}
