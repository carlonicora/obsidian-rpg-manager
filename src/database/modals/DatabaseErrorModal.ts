import {App, Component, MarkdownRenderer, TFile} from "obsidian";
import {RpgErrorInterface} from "../../core/interfaces/RpgErrorInterface";
import {ViewType} from "../../../REFACTOR/views/enums/ViewType";
import {AbstractRpgManagerModal} from "../../../REFACTOR/abstracts/AbstractRpgManagerModal";

export class DatabaseErrorModal extends AbstractRpgManagerModal {
	constructor(
		app: App,
		private _misconfiguredTags: Map<TFile, RpgErrorInterface>|undefined,
		private _singleError: RpgErrorInterface|undefined = undefined,
		private _singleErrorFile: TFile|undefined = undefined,
	) {
		super(app);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();

		contentEl.createEl('h1', {cls: 'error', text: 'RPG Manager Error'});

		if (this._singleError !== undefined && this._singleErrorFile !== undefined && this._misconfiguredTags === undefined) {
			this._misconfiguredTags = new Map();
			this._misconfiguredTags.set(this._singleErrorFile, this._singleError);
		}

		if (this._misconfiguredTags === undefined) this._misconfiguredTags = new Map<TFile, RpgErrorInterface>();

		contentEl.createEl('p', {text: 'One or more of the tags that define an outline or an element are not correctly configured and can\'t be read!'});
		contentEl.createEl('p', {text: 'Please double check the errors and correct them.'});

		this._misconfiguredTags.forEach((error: RpgErrorInterface, file: TFile) => {
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
				[this._misconfiguredTags],
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
