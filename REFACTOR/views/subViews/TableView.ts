import {ComponentType} from "../../../src/core/enums/ComponentType";
import {IdInterface} from "../../../src/services/idService/interfaces/IdInterface";
import {setIcon} from "obsidian";
import {AdventureInterface} from "../../../src/components/adventure/interfaces/AdventureInterface";
import {ActInterface} from "../../../src/components/act/interfaces/ActInterface";
import {RelationshipType} from "../../../src/services/relationshipsService/enums/RelationshipType";

export class TableView extends AbstractSubModelView {
	private _tableEl: HTMLTableElement;

	public render(
		container: HTMLElement,
		data: TableResponseInterface,
	): void {
		const divContainer = container.createDiv();
		if (data.title != null) {
			const headerEl = divContainer.createEl('h3', {cls: 'rpgm-table-header'});
			const arrowEl: HTMLSpanElement = headerEl.createSpan();
			arrowEl.style.marginRight = '10px';
			setIcon(arrowEl, 'openClose');

			const arrowIconEl: HTMLElement = arrowEl.children[0] as HTMLElement;

			if (data.open) {
				arrowIconEl.style.transform = 'rotate(90deg)';
			}

			headerEl.createSpan({text: data.title});

			headerEl.addEventListener('click', () => {
				if (this._tableEl.style.display === 'none'){
					this._tableEl.style.display = '';
					arrowIconEl.style.transform = 'rotate(90deg)';
				} else {
					this._tableEl.style.display = 'none';
					arrowIconEl.style.transform = 'rotate(0deg)';
				}
			});
		}
		let id:IdInterface|undefined;

		this._tableEl = divContainer.createEl('table');
		this._tableEl.addClass('rpgm-table');

		this._tableEl.style.display = data.open ? '' : 'none';

		if (data.class != null){
			this._tableEl.addClass(data.class);
		}

		if (data.headers != null && data.headers.length > 0) {
			const header = this._tableEl.createEl('tr');
			data.headers.forEach((content: ContentInterface) => {
				const cell = header.createEl('th');
				content.fillContent(cell, this.sourcePath);
				if (content.isInLine) {
					cell.addClass('inline');
				}
			});
		}

		const tableBodyElement = this._tableEl.createTBody();
		data.content.forEach((element: TableResponseElementInterface) => {
			const row = tableBodyElement.insertRow();
			row.addClass('hoverable');

			const isRowEditable = (
				element.relationship !== undefined &&
				(
					element.relationship.type !== RelationshipType.Parent &&
					element.relationship.type !== RelationshipType.Hierarchy
				)
			)
			if (isRowEditable) row.addClass('editable');

			element.elements.forEach((content: ContentInterface) => {
				const cell = row.insertCell();

				if (content instanceof DateContent) cell.style.fontSize = '0.7em';
				if (content instanceof ImageContent) cell.addClass('image');

				content.fillContent(cell, this.sourcePath);



				if (content.isInLine) cell.addClass('inline');

				if (content.isEditable && isRowEditable) cell.addClass('editable');

				if (content.isEditable && isRowEditable) {
					this.addRelationshipEditorIcon(cell, data.currentComponent, element.relationship.path);
				}
			});
		});
	}
}
