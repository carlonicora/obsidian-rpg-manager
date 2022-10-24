import {TFile} from "obsidian";
import {AbstractRpgManager} from "../core/abstracts/AbstractRpgManager";
import {DatabaseInterface} from "../database/interfaces/DatabaseInterface";
import {DatabaseInitialiser} from "../database/DatabaseInitialiser";
import {LogMessageType} from "../services/loggers/enums/LogMessageType";

export class SettingsUpdater extends AbstractRpgManager {
	public async updateTags(
		updatedTags: Map<string,string>,
	): Promise<void> {
		this.factories.logger.info(LogMessageType.TagUpdates, 'Collecting files');
		const files: TFile[] = await this.app.vault.getMarkdownFiles();

		for (let index=0; index<files.length; index++){
			const content = await this.app.vault.read(files[index]);
			this.factories.logger.info(LogMessageType.TagUpdates, 'Reading file contents', files[index]);

			let newFileContent = content;
			await updatedTags.forEach((newTag: string, oldTag:string) => {
				newFileContent = newFileContent.replaceAll(oldTag, newTag);
			});
			this.factories.logger.info(LogMessageType.TagUpdates, 'Tags Updated', files[index]);

			if (newFileContent !== content) {
				await this.app.vault.modify(files[index], newFileContent);
				this.factories.logger.info(LogMessageType.TagUpdates, 'File updated', files[index]);
			}
		}

		this.factories.logger.info(LogMessageType.TagUpdates, 'Re-initialising database');
		return await DatabaseInitialiser.initialise(this.app)
			.then((database: DatabaseInterface) => {
				this.database = database;
				this.factories.logger.info(LogMessageType.TagUpdates, 'Database re-initialised');
				this.app.workspace.trigger("rpgmanager:refresh-views");
				return;
			});
	}
}
