import {Component, MarkdownRenderer, TFile} from "obsidian";
import {RpgErrorInterface} from "../../errors/interfaces/RpgErrorInterface";
import {AbstractStaticView} from "../../../managers/staticViewsManager/abstracts/AbstractStaticView";
import {StaticViewType} from "../../../managers/staticViewsManager/enums/StaticViewType";
import {IndexSwitcherModal} from "../../../services/indexService/modals/IndexSwitcherModal";

export class ErrorView extends AbstractStaticView {
	protected viewType: string = StaticViewType.Errors.toString();
	protected displayText = 'RPG Manager Errors';
	public icon = 'd20';

	private _errors: Map<TFile, RpgErrorInterface> = new Map();

	public initialise(
		params: any[],
	): void {
		this._errors = params[0];
	}

	public async render(
	): Promise<void> {
		if (this._errors !== undefined && this._errors.size > 0) {
			this._errors.forEach((error: RpgErrorInterface, file: TFile) => {
				const errorEl = this.rpgmContentEl.createEl('div');

				const errorTitle: string|undefined = error.getErrorTitle();

				let title: HTMLElement;
				if (errorTitle !== undefined){
					title = errorEl.createEl('span');
					title.textContent = errorTitle;
				} else {
					title = errorEl.createEl('a');
					this._addLink(title as HTMLAnchorElement, file.path);
				}

				title.style.fontWeight = 'bold';

				const errorDescriptionEl = errorEl.createEl('div');

				MarkdownRenderer.renderMarkdown(
					error.showErrorActions(),
					errorDescriptionEl,
					file.path,
					null as unknown as Component,
				);

				const errorLinksEl = errorDescriptionEl.createEl('ul');
				const errorLinkEl = errorLinksEl.createEl('li');
				const errorLinkAnchorEl = errorLinkEl.createEl('a', {href: '#', text: 'Fix the issue'});
				errorLinkAnchorEl.addEventListener('click', () => {
					new IndexSwitcherModal(this.api, file).open();
				});
			});
		}

		const closeButtonEl = this.contentEl.createEl('button', {text: 'Close'});
		closeButtonEl.addEventListener("click", () => {
			this.app.workspace.detachLeavesOfType(StaticViewType.Errors.toString());
		});
	}

	private _addLink(
		contentEl: HTMLAnchorElement,
		linkOrFile: string|TFile,
	): void {
		let file: TFile;

		if (linkOrFile instanceof TFile){
			file = linkOrFile;
			linkOrFile = file.basename;
		} else {
			file = this.app.vault.getAbstractFileByPath(linkOrFile) as TFile;
		}

		if (file != null) {
			contentEl.textContent = file.basename;
			contentEl.style.textDecoration = 'underlined';
			contentEl.addEventListener("click", () => {
				this.app.workspace.getLeaf(false).openFile(file);
			});
		}
	}
}
