import {DatabaseUpdateWorkerInterface} from "../../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../../abstracts/AbstractDatabaseWorker";
import {TFile} from "obsidian";

export class V1_3_to_2_0_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
	): Promise<void> {
		console.error('Updating RPG Manager from v1.3 to v2.0');
		/**
		 * update session tags to act tags
		 * 	read previous session tag
		 * 	replace the word 'session' with the word 'act' (both uppercase and lowercase)
		 * 	update all the files
		 * 	read all the campaigns (HEY, I DON'T HAVE THEM HERE - READ FROM METADATA PLEASE)
		 * 	rename the subfolders of campaign roots from 'Sessions' folders to 'Acts'
		 */

		let sessionTag: string = this.settings.sessionTag;
		let actTag = sessionTag
			.replaceAll('session', 'act')
			.replaceAll('Session', 'Act')
			.replaceAll('SESSION', 'ACT');

		const campaigns:Array<TFile> = [];

		const files: TFile[] = await this.app.vault.getMarkdownFiles();
		for (let index=0; index<files.length; index++){
			//load file content
			const content = await this.app.vault.read(files[index]);

			let newFileContent = content.replaceAll(this.settings.sessionTag, this.settings.actTag);

			if (newFileContent !== content) {
				console.log('File Changed: ' + files[index].name);
				//await this.app.vault.modify(files[index], newFileContent);
			}

			if (content.contains(this.settings.campaignTag)){
				campaigns.push(files[index]);
			}
		}


		//await this.settings.updateSettings({actTag: actTag});

		for (let index=0; index<campaigns.length; index++){
			const file: TFile = campaigns[index];
			console.log(file.path);
		}

		return;
	}
}
