import {TableResponseInterface} from "../../responses/interfaces/TableResponseInterface";
import {ContentInterface} from "../../responses/contents/interfaces/ContentInterface";
import {AbstractSubModelView} from "../abstracts/AbstractSubModelView";
import {ComponentType} from "../../components/enums/ComponentType";
import {IdInterface} from "../../id/interfaces/IdInterface";
import {DateContent} from "../../responses/contents/DateContent";
import {EditorSelector} from "../../helpers/EditorSelector";
import {setIcon} from "obsidian";
import {AdventureInterface} from "../../components/components/adventure/interfaces/AdventureInterface";
import {ActInterface} from "../../components/components/act/interfaces/ActInterface";
import {TableResponseElementInterface} from "../../responses/interfaces/TableResponseElementInterface";
import {RelationshipType} from "../../relationships/enums/RelationshipType";
import {ImageContent} from "../../responses/contents/ImageContent";

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

			if (data.class === 'rpgm-plot'){
				const titleEditor = headerEl.createEl('span', {cls: 'rpgm-td-edit', text: 'edit'});
				titleEditor.addEventListener('click', () => {
					EditorSelector.focusOnDataKey(this.app, data.currentComponent);
				})
			}
		}

		if (data.create !== undefined){
			const createButtonEl = divContainer.createEl('button', {cls: 'create-button'});

			let id:IdInterface|undefined;


			switch(data.create){
				case ComponentType.Adventure:
					createButtonEl.textContent = 'Create act from Adventure Plot';
					createButtonEl.addEventListener("click", () => {
						if (data.campaignId !== undefined && data.adventureId !== undefined) {
							id = this.factories.id.create(ComponentType.Adventure, data.campaignId, data.adventureId);
							if (id !== undefined) {
								const previousAdventure = this.database.readSingle<AdventureInterface>(
									ComponentType.Adventure,
									id,
									data.adventureId - 1,
								);

								let nextActId = 1;
								if (previousAdventure != null){
									const previousAdventureActs = this.database.readList<ActInterface>(
										ComponentType.Act,
										id,
										previousAdventure.id.adventureId,
									);
									previousAdventureActs.forEach((act: ActInterface) => {
										if (nextActId <= (act.id.actId ?? 0)) nextActId = (act.id.actId ?? 0) + 1;
									});
								}

								data.content.forEach((element: TableResponseElementInterface) => {
									const content = element.elements[1];
									if (data.campaignId != null) {
										this.factories.files.silentCreate(
											ComponentType.Act,
											'Act ' + nextActId,
											data.campaignId,
											data.adventureId,
											nextActId,
											undefined,
											undefined,
											{
												synopsis: content.content,
											}
										);
									}
									nextActId++;
								});
							}

							createButtonEl.style.display = 'none';
						}
					});

					break;
			}
		}

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
