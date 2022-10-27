import {Component, MarkdownRenderer, TFile} from "obsidian";
import {RpgErrorInterface} from "../../../errors/interfaces/RpgErrorInterface";
import {AbstractModal} from "../../modalsManager/abstracts/AbstractModal";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {StaticViewType} from "../../staticViewsManager/enums/StaticViewType";

export class DatabaseErrorModal extends AbstractModal {
	constructor(
		api: RpgManagerApiInterface,
		private _misconfiguredTags: Map<TFile, RpgErrorInterface>|undefined,
		private _singleError: RpgErrorInterface|undefined = undefined,
		private _singleErrorFile: TFile|undefined = undefined,
	) {
		super(api);
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
			this.api.staticViews.create(StaticViewType.Errors, [this._misconfiguredTags]);
			this.close();
		});
	}

	onClose() {
		super.onClose();

		const {contentEl} = this;
		contentEl.empty();
	}
}
