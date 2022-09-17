import {App, TFile} from "obsidian";
import {Database} from "../database/Database";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";

export class SettingsUpdater {
	constructor(
		private app: App,
	) {

	}

	public async updateElementTags(
		previousTag: string,
		newTag: string,
	): Promise<void> {
		console.log(previousTag, newTag);
		return;
		//get all TFiles
		const files: TFile[] = this.app.vault.getMarkdownFiles();

		for (let index=0; index<files.length; index++){
			//load file content
			const content = await this.app.vault.read(files[index]);

			if (content.indexOf(previousTag) !== -1) {
				const newFileContent = content.replaceAll(previousTag, newTag);
				await this.app.vault.modify(files[index], newFileContent);
			}
		}

		return Database.initialise(this.app)
			.then((database: DatabaseInterface) => {
				this.app.plugins.getPlugin('rpg-manager').database = database;
				this.app.workspace.trigger("rpgmanager:refresh-views");
				return;
			});

	}
}
