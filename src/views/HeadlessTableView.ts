import {ContentInterface} from "../responses/contents/interfaces/ContentInterface";
import {HeaderResponseElementInterface} from "../responses/interfaces/HeaderResponseElementInterface";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {App} from "obsidian";

export class HeadlessTableView extends AbstractRpgManager{
	public tableEl: HTMLTableElement;

	constructor(
		app: App,
		private sourcePath: string,
	) {
		super(app);
		this.tableEl = document.createElement('table');
		this.tableEl.addClass('rpgm-headless-table');
	}

	public addRow(
		element: HeaderResponseElementInterface|string,
		fn: any,
		additionalParams: Array<any>|undefined=undefined,
	): void {
		const rowEl = this.tableEl.createEl('tr');
		rowEl.createEl('td', {cls: 'header', text: (typeof element === 'string' ? element : element.title)});
		const cellContentEl = rowEl.createEl('td', {cls: 'content'});

		let subContent: any|ContentInterface|undefined;

		if (additionalParams === undefined) {
			subContent = fn(cellContentEl, element);
		} else {
			subContent = fn(cellContentEl, ...additionalParams);
		}

		if (subContent !== undefined) {
			const subRowEl = this.tableEl.createEl('tr');
			subRowEl.createEl('td', {text: ''});
			const subRowContentEl = subRowEl.createEl('td', {cls: 'subcontent'});

			if (typeof subContent === 'function'){
				if (additionalParams === undefined) {
					subContent(subRowContentEl, element);
				} else {
					subContent(subRowContentEl, ...additionalParams);
				}
			} else {
				subContent.fillContent(subRowContentEl, this.sourcePath);
			}
		}
	}
}
