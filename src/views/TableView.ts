import {TableResponseInterface} from "../interfaces/response/TableResponseInterface";
import {ContentInterface} from "../interfaces/ContentInterface";
import {AbstractView} from "../abstracts/AbstractView";
import {DataType} from "../enums/DataType";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";

export class TableView extends AbstractView {
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
			switch(data.create){
				case DataType.Adventure:
					createButtonEl.textContent = 'Create session from Adventure Plot';
					createButtonEl.addEventListener("click", () => {
						if (data.campaignId !== undefined && data.adventureId !== undefined) {
							const previousAdventure = this.app.plugins.getPlugin('rpg-manager').io.readSingleParametrised<AdventureInterface>(
								undefined,
								DataType.Adventure,
								data.campaignId,
								data.adventureId - 1,
							);
							let nextSessionId = 1;
							if (previousAdventure != null){
								const previousAdventureSessions = this.app.plugins.getPlugin('rpg-manager').io.readListParametrised<SessionInterface>(
									undefined,
									DataType.Session,
									data.campaignId,
									previousAdventure.adventureId,
								);
								previousAdventureSessions.forEach((session: SessionInterface) => {
									if (nextSessionId <= session.sessionId) nextSessionId = session.sessionId + 1;
								});
							}

							data.content.forEach((element: Array<ContentInterface>) => {
								const content = element[1];
								if (data.campaignId != null) {
									this.app.plugins.getPlugin('rpg-manager').factories.files.silentCreate(
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
