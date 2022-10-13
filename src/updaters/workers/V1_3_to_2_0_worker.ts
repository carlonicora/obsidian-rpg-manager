import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {TAbstractFile, TFile, TFolder} from "obsidian";
import {LogMessageType} from "../../loggers/enums/LogMessageType";
import {DatabaseUpdaterReporterInterface} from "../interfaces/DatabaseUpdaterReporterInterface";
import {TagHelper} from "../../databases/TagHelper";

export class V1_3_to_2_0_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<void> {
		this.factories.logger.warning(LogMessageType.Updater, 'Updating RPG Manager from v1.3 to v2.0');

		const campaigns: Array<TFile> = [];
		const sessions: Array<TFile> = [];

		const files: TFile[] = await this.app.vault.getMarkdownFiles();
		const fileMap: Map<TFile, string> = new Map<TFile, string>();

		let wasAlreadyUpdated = false;

		for (let index = 0; index < files.length; index++) {
			const content = await this.app.vault.read(files[index]);
			fileMap.set(files[index], content);

			if (content.indexOf('```RpgManager\nact') !== -1) wasAlreadyUpdated = true;
		}

		if (!wasAlreadyUpdated) {
			for (let index = 0; index < files.length; index++) {
				const content = await this.app.vault.read(files[index]);

				const newFileContent = await content
					.replaceAll(TagHelper.sessionTag, TagHelper.actTag)
					.replaceAll('```RpgManager\nsession', '```RpgManager\nact');

				if (newFileContent !== content) {
					if (files[index].basename.toLowerCase().indexOf('session') !== -1) sessions.push(files[index]);

					await this.app.vault.modify(files[index], newFileContent);
				}

				if (content.contains(TagHelper.campaignTag)) {
					campaigns.push(files[index]);
				}
			}

			for (let sessionIndex = 0; sessionIndex < sessions.length; sessionIndex++) {
				const path = sessions[sessionIndex].path;
				const basename = sessions[sessionIndex].basename;
				const newBaseName = basename
					.replaceAll('session', 'act')
					.replaceAll('Session', 'Act')
					.replaceAll('SESSION', 'ACT');
				const newPath = path.replaceAll(basename, newBaseName);
				await this.app.vault.rename(sessions[sessionIndex], newPath);
			}

			const changedPaths: Map<string, boolean> = new Map<string, boolean>();

			for (let index = 0; index < campaigns.length; index++) {
				const file: TFile = campaigns[index];
				await file.parent.children.forEach((fileOrFolder: TAbstractFile) => {
					if (fileOrFolder instanceof TFolder && fileOrFolder.name === 'Sessions') {
						if (changedPaths.get(fileOrFolder.path) === undefined) {
							changedPaths.set(fileOrFolder.path + '', true);
							const newPath = fileOrFolder.path.replaceAll('Sessions', 'Acts');
							this.app.vault.rename(fileOrFolder, newPath);
						}
					}
				});
			}
		}

		return;
	}
}
