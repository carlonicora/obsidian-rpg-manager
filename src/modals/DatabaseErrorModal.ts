import {App, Component, MarkdownRenderer, TFile} from "obsidian";
import {RpgErrorInterface} from "../errors/interfaces/RpgErrorInterface";
import {ViewType} from "../views/enums/ViewType";
import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";

export class DatabaseErrorModal extends AbstractRpgManagerModal {
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

		if (this.singleError !== undefined && this.singleErrorFile !== undefined && this.misconfiguredTags === undefined) {
			this.misconfiguredTags = new Map();
			this.misconfiguredTags.set(this.singleErrorFile, this.singleError);
		}

		if (this.misconfiguredTags === undefined) this.misconfiguredTags = new Map<TFile, RpgErrorInterface>();

		contentEl.createEl('p', {text: 'One or more of the tags that define an outline or an element are not correctly configured and can\'t be read!'});
		contentEl.createEl('p', {text: 'Please double check the errors and correct them.'});

		this.misconfiguredTags.forEach((error: RpgErrorInterface, file: TFile) => {
			const errorEl = contentEl.createEl('div');

			const title = error.getErrorTitle() ?? file.basename;

			MarkdownRenderer.renderMarkdown(
				'**' + title + '**\n' + error.showErrorMessage(),
				errorEl,
				file.path,
				null as unknown as Component,
			);
		});

		const viewErrorsButtonEl = contentEl.createEl('button', {text: 'Fix errors'});
		viewErrorsButtonEl.addEventListener("click", () => {
			this.app.plugins.getPlugin('rpg-manager').factories.views.showObsidianView(
				ViewType.Errors,
				[this.misconfiguredTags],
			)
			this.close();
		});
	}

	onClose() {
		super.onClose();

		const {contentEl} = this;
		contentEl.empty();
	}
}
