import {TableResponseInterface} from "../../interfaces/response/TableResponseInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {AbstractComponentView} from "../../abstracts/AbstractComponentView";
import {RecordType} from "../../enums/RecordType";
import {ActInterface} from "../../interfaces/data/ActInterface";
import {AdventureInterface} from "../../interfaces/data/AdventureInterface";
import {IdInterface} from "../../interfaces/data/IdInterface";
import {DateContent} from "../../data/content/DateContent";
import {EditorSelector} from "../../helpers/EditorSelector";
import {setIcon} from "obsidian";

export class TableView extends AbstractComponentView {
	private tableEl: HTMLTableElement;

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

			if (data.open) arrowIconEl.style.transform = 'rotate(90deg)';

			headerEl.createSpan({text: data.title});

			headerEl.addEventListener('click', () => {
				if (this.tableEl.style.display === 'none'){
					this.tableEl.style.display = '';
					arrowIconEl.style.transform = 'rotate(90deg)';
				} else {
					this.tableEl.style.display = 'none';
					arrowIconEl.style.transform = 'rotate(0deg)';
				}
			});
		}

		if (data.class === 'rpgm-plot'){
			const titleEditor = divContainer.createEl('span', {cls: 'rpgm-td-edit', text: 'edit'});
			titleEditor.addEventListener('click', () => {
				EditorSelector.select(this.app, data.currentElement);
			})
		}

		if (data.create !== undefined){
			const createButtonEl = divContainer.createEl('button', {cls: 'create-button'});

			let id:IdInterface|undefined;


			switch(data.create){
				case RecordType.Adventure:
					createButtonEl.textContent = 'Create act from Adventure Plot';
					createButtonEl.addEventListener("click", () => {
						if (data.campaignId !== undefined && data.adventureId !== undefined) {
							id = this.factories.id.create(RecordType.Adventure, data.campaignId, data.adventureId);
							if (id !== undefined) {
								const previousAdventure = this.database.readSingle<AdventureInterface>(
									RecordType.Adventure,
									id,
									data.adventureId - 1,
								);

								let nextActId = 1;
								if (previousAdventure != null){
									const previousAdventureActs = this.database.readList<ActInterface>(
										RecordType.Act,
										id,
										previousAdventure.adventureId,
									);
									previousAdventureActs.forEach((act: ActInterface) => {
										if (nextActId <= act.actId) nextActId = act.actId + 1;
									});
								}

								data.content.forEach((element: Array<ContentInterface>) => {
									const content = element[1];
									if (data.campaignId != null) {
										this.factories.files.silentCreate(
											RecordType.Act,
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

		this.tableEl = divContainer.createEl('table');
		this.tableEl.addClass('rpgm-table');

		this.tableEl.style.display = data.open ? '' : 'none';

		if (data.class != null){
			this.tableEl.addClass(data.class);
		}

		if (data.headers != null && data.headers.length > 0) {
			const header = this.tableEl.createEl('tr');
			data.headers.forEach((content: ContentInterface) => {
				const cell = header.createEl('th');
				content.fillContent(cell, this.sourcePath);
				if (content.isInLine) {
					cell.addClass('inline');
				}
			});
		}

		data.content.forEach((element: Array<ContentInterface>) => {
			const row = this.tableEl.createEl('tr');
			element.forEach((content: ContentInterface) => {
				const cell = row.createEl('td');
				if (content instanceof DateContent) {
					cell.style.fontSize = '0.7em';
				}
				content.fillContent(cell, this.sourcePath);

				if (content.isInLine){
					cell.addClass('inline');
				}
			});
		});
	}
}
