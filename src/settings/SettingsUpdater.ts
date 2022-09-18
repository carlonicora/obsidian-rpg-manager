import {App, TFile} from "obsidian";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {DatabaseInitialiser} from "../database/DatabaseInitialiser";

export class SettingsUpdater {
	constructor(
		private app: App,
	) {

	}

	public async updateTags(
		updatedTags: Map<string,string>,
	): Promise<void> {
		//get all TFiles
		const files: TFile[] = await this.app.vault.getMarkdownFiles();

		for (let index=0; index<files.length; index++){
			//load file content
			const content = await this.app.vault.read(files[index]);

			let newFileContent = content;
			await updatedTags.forEach((newTag: string, oldTag:string) => {
				newFileContent = newFileContent.replaceAll(oldTag, newTag);
			});
			if (newFileContent !== content) await this.app.vault.modify(files[index], newFileContent);
		}

		return await DatabaseInitialiser.initialise(this.app)
			.then((database: DatabaseInterface) => {
				this.app.plugins.getPlugin('rpg-manager').database = database;
				this.app.workspace.trigger("rpgmanager:refresh-views");
				return;
			});

	}
}
