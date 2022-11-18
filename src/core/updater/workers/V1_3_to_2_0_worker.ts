import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {TAbstractFile, TFile, TFolder} from "obsidian";
import {DatabaseUpdaterReporterInterface} from "../interfaces/DatabaseUpdaterReporterInterface";
import {TagService} from "../../../services/tagService/TagService";
import {LogMessageType} from "../../../services/loggerService/enums/LogMessageType";
import {LoggerService} from "../../../services/loggerService/LoggerService";

export class V1_3_to_2_0_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<void> {
		this.api.service(LoggerService).warning(LogMessageType.Updater, 'Updating RPG Manager from v1.3 to v2.0');

		const campaigns: TFile[] = [];
		const sessions: TFile[] = [];

		const files: TFile[] = await this.api.app.vault.getMarkdownFiles();
		const fileMap: Map<TFile, string> = new Map<TFile, string>();

		let wasAlreadyUpdated = false;

		for (let index = 0; index < files.length; index++) {
			const content = await this.api.app.vault.read(files[index]);

			if (content.indexOf('```RpgManager') !== -1 && content.indexOf('```RpgManagerID') === -1) {
				fileMap.set(files[index], content);

				if (content.indexOf('```RpgManager\nact') !== -1)
					wasAlreadyUpdated = true;

			}
		}

		if (!wasAlreadyUpdated) {
			for (let index = 0; index < files.length; index++) {
				if (fileMap.get(files[index]) === undefined)
					continue;

				const content = await this.api.app.vault.read(files[index]);

				const newFileContent = await content
					.replaceAll(TagService.sessionTag, TagService.actTag)
					.replaceAll('```RpgManager\nsession', '```RpgManager\nact');

				if (newFileContent !== content) {
					if (files[index].basename.toLowerCase().indexOf('session') !== -1) sessions.push(files[index]);

					await this.api.app.vault.modify(files[index], newFileContent);
				}

				if (content.contains(TagService.campaignTag)) {
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
				await this.api.app.vault.rename(sessions[sessionIndex], newPath);
			}

			const changedPaths: Map<string, boolean> = new Map<string, boolean>();

			for (let index = 0; index < campaigns.length; index++) {
				const file: TFile = campaigns[index];
				await file.parent.children.forEach((fileOrFolder: TAbstractFile) => {
					if (fileOrFolder instanceof TFolder && fileOrFolder.name === 'Sessions') {
						if (changedPaths.get(fileOrFolder.path) === undefined) {
							changedPaths.set(fileOrFolder.path + '', true);
							const newPath = fileOrFolder.path.replaceAll('Sessions', 'Acts');
							this.api.app.vault.rename(fileOrFolder, newPath);
						}
					}
				});
			}
		}

		return;
	}
}
