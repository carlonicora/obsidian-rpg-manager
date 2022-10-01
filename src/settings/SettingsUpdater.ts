import {TFile} from "obsidian";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {InfoLog, LogMessageType} from "../helpers/Logger";
import {DatabaseV2Interface} from "../_dbV2/interfaces/DatabaseV2Interface";
import {DatabaseV2Initialiser} from "../_dbV2/DatabaseV2Initialiser";

export class SettingsUpdater extends AbstractRpgManager {
	public async updateTags(
		updatedTags: Map<string,string>,
	): Promise<void> {
		new InfoLog(LogMessageType.TagUpdates, 'Collecting files');
		const files: TFile[] = await this.app.vault.getMarkdownFiles();

		for (let index=0; index<files.length; index++){
			const content = await this.app.vault.read(files[index]);
			new InfoLog(LogMessageType.TagUpdates, 'Reading file contents', files[index]);

			let newFileContent = content;
			await updatedTags.forEach((newTag: string, oldTag:string) => {
				newFileContent = newFileContent.replaceAll(oldTag, newTag);
			});
			new InfoLog(LogMessageType.TagUpdates, 'Tags Updated', files[index]);

			if (newFileContent !== content) {
				await this.app.vault.modify(files[index], newFileContent);
				new InfoLog(LogMessageType.TagUpdates, 'File updated', files[index]);
			}
		}

		new InfoLog(LogMessageType.TagUpdates, 'Re-initialising database');
		return await DatabaseV2Initialiser.initialise(this.app)
			.then((database: DatabaseV2Interface) => {
				this.database = database;
				new InfoLog(LogMessageType.TagUpdates, 'Database re-initialised');
				this.app.workspace.trigger("rpgmanager:refresh-views");
				return;
			});
	}
}
