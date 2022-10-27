import {TFile} from "obsidian";
import {DatabaseInterface} from "../database/interfaces/DatabaseInterface";
import {DatabaseInitialiser} from "../database/DatabaseInitialiser";
import {RpgManagerApiInterface} from "../api/interfaces/RpgManagerApiInterface";
import {LoggerService} from "../services/loggerService/LoggerService";
import {LogMessageType} from "../services/loggerService/enums/LogMessageType";

export class SettingsUpdater {
	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public async updateTags(
		updatedTags: Map<string,string>,
	): Promise<void> {
		this._api.service(LoggerService).info(LogMessageType.TagUpdates, 'Collecting files');
		const files: TFile[] = await this._api.app.vault.getMarkdownFiles();

		for (let index=0; index<files.length; index++){
			const content = await this._api.app.vault.read(files[index]);
			this._api.service(LoggerService).info(LogMessageType.TagUpdates, 'Reading file contents', files[index]);

			let newFileContent = content;
			await updatedTags.forEach((newTag: string, oldTag:string) => {
				newFileContent = newFileContent.replaceAll(oldTag, newTag);
			});
			this._api.service(LoggerService).info(LogMessageType.TagUpdates, 'Tags Updated', files[index]);

			if (newFileContent !== content) {
				await this._api.app.vault.modify(files[index], newFileContent);
				this._api.service(LoggerService).info(LogMessageType.TagUpdates, 'File updated', files[index]);
			}
		}

		this._api.service(LoggerService).info(LogMessageType.TagUpdates, 'Re-initialising database');
		return await DatabaseInitialiser.initialise(this._api)
			.then((database: DatabaseInterface) => {
				this._api.database = database;
				this._api.service(LoggerService).info(LogMessageType.TagUpdates, 'Database re-initialised');
				this._api.app.workspace.trigger("rpgmanager:refresh-views");
				return;
			});
	}
}
