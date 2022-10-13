import {Component, MarkdownRenderer, TFile} from "obsidian";
import {RpgErrorInterface} from "../errors/interfaces/RpgErrorInterface";
import {ViewType} from "./enums/ViewType";
import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";
import {IdSwitcherModal} from "../modals/IdSwitcherModal";

export class ErrorView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.Errors.toString();
	protected displayText = 'RPG Manager Errors';
	public icon = 'd20';

	private errors: Map<TFile, RpgErrorInterface> = new Map();

	public initialise(
		params: Array<any>,
	): void {
		this.errors = params[0];
	}

	public async render(
	): Promise<void> {
		if (this.errors !== undefined && this.errors.size > 0) {
			this.errors.forEach((error: RpgErrorInterface, file: TFile) => {
				const errorEl = this.rpgmContentEl.createEl('div');

				const errorTitle: string|undefined = error.getErrorTitle();

				let title: HTMLElement;
				if (errorTitle !== undefined){
					title = errorEl.createEl('span');
					title.textContent = errorTitle;
				} else {
					title = errorEl.createEl('a');
					this.addLink(title as HTMLAnchorElement, file.path)
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
					new IdSwitcherModal(this.app, file).open();
				});

				/*
				const errorLinks = error.getErrorLinks();
				if (errorLinks !== undefined){
					const errorLinksEl = errorDescriptionEl.createEl('ul');
					errorLinks.forEach((path: string) => {
						const errorLinkEl = errorLinksEl.createEl('li');
						const errorLinkAnchor = errorLinkEl.createEl('a');
						this.addLink(errorLinkAnchor, path);
					});
				}
				 */
			});
		}

		const closeButtonEl = this.contentEl.createEl('button', {text: 'Close'});
		closeButtonEl.addEventListener("click", () => {
			this.app.workspace.detachLeavesOfType(ViewType.Errors.toString());
		});
	}

	private addLink(
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
