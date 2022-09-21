import {TableResponseInterface} from "../../interfaces/response/TableResponseInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {AbstractComponentView} from "../../abstracts/AbstractComponentView";
import {DataType} from "../../enums/DataType";
import {SessionInterface} from "../../interfaces/data/SessionInterface";
import {AdventureInterface} from "../../interfaces/data/AdventureInterface";
import {IdInterface} from "../../interfaces/data/IdInterface";

export class TableView extends AbstractComponentView {
	public render(
		container: HTMLElement,
		data: TableResponseInterface,
	): void {
		const divContainer = container.createDiv();
		if (data.title != null) {
			divContainer.createEl('h2', {text: data.title});
		}

		if (data.create !== undefined){
			const createButtonEl = divContainer.createEl('button', {cls: 'create-button'});

			let id:IdInterface|undefined;


			switch(data.create){
				case DataType.Adventure:
					createButtonEl.textContent = 'Create session from Adventure Plot';
					createButtonEl.addEventListener("click", () => {
						if (data.campaignId !== undefined && data.adventureId !== undefined) {
							id = this.factories.id.create(DataType.Adventure, data.campaignId, data.adventureId);
							if (id !== undefined) {
								const previousAdventure = this.database.readSingle<AdventureInterface>(
									DataType.Adventure,
									id,
									data.adventureId - 1,
								);

								let nextSessionId = 1;
								if (previousAdventure != null){
									const previousAdventureSessions = this.database.readList<SessionInterface>(
										DataType.Session,
										id,
										undefined,
										previousAdventure.adventureId,
									);
									previousAdventureSessions.forEach((session: SessionInterface) => {
										if (nextSessionId <= session.sessionId) nextSessionId = session.sessionId + 1;
									});
								}

								data.content.forEach((element: Array<ContentInterface>) => {
									const content = element[1];
									if (data.campaignId != null) {
										this.factories.files.silentCreate(
											DataType.Session,
											'Session ' + nextSessionId,
											data.campaignId,
											data.adventureId,
											nextSessionId,
											undefined,
											{
												synopsis: content.content,
											}
										);
									}
									nextSessionId++;
								});
							}

							createButtonEl.style.display = 'none';
						}
					});

					break;
			}
		}

		const table = divContainer.createEl('table');
		table.addClass('rpgm-table');

		if (data.class != null){
			table.addClass(data.class);
		}

		if (data.headers != null && data.headers.length > 0) {
			const header = table.createEl('tr');
			data.headers.forEach((content: ContentInterface) => {
				const cell = header.createEl('th');
				content.fillContent(cell, this.sourcePath);
				if (content.isInLine) {
					cell.addClass('inline');
				}
			});
		}

		data.content.forEach((element: Array<ContentInterface>) => {
			const row = table.createEl('tr');
			element.forEach((content: ContentInterface) => {
				const cell = row.createEl('td');
				content.fillContent(cell, this.sourcePath);

				if (content.isInLine){
					cell.addClass('inline');
				}
			});
		});
	}
}
