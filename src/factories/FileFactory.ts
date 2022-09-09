import {MarkdownView} from "obsidian";
import {DataType} from "../enums/DataType";
import {CampaignSetting} from "../enums/CampaignSetting";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";

export class FileFactory extends AbstractFactory {
	public async create(
		settings: CampaignSetting,
		type: DataType,
		create: boolean,
		createFrontMatterOnly: boolean,
		name: string,
		campaignId: number|null=null,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
		additionalInformation: any|null = null,
	): Promise<void> {
		let folder = '/';

		if (campaignId != null) {
			const campaign: CampaignInterface | null = this.app.plugins.getPlugin('rpg-manager').io.getCampaign(campaignId);
			if (campaign != null) {
				settings = campaign.settings;
				folder = campaign.folder;
			}
		}

		const template = this.app.plugins.getPlugin('rpg-manager').factories.templates.create(
			settings,
			type,
			createFrontMatterOnly,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
			additionalInformation,
		);

		const data: string = template.generateData();


		let fullPath: string;
		if (type !== DataType.Campaign) {
			fullPath = folder.substring(1) + DataType[type] + 's';
			if (this.app.vault.getAbstractFileByPath(fullPath) == null){
				await app.vault.createFolder(fullPath);
			}
		} else {
			fullPath = folder.substring(1);
		}

		if (create) {
			const newFile = await app.vault.create(fullPath + '/' + name + '.md', data);
			const currentLeaf = app.workspace.getActiveViewOfType(MarkdownView);
			const leaf = app.workspace.getLeaf((currentLeaf != null));
			await leaf.openFile(newFile);
		} else {
			const activeView = app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView != null) {
				const editor = activeView.editor;
				editor.setValue(data + '\n' + editor.getValue());

				let file = activeView.file;
				await this.app.fileManager.renameFile(file, fullPath + '/' + name + '.md');
				file = activeView.file;

				activeView.leaf.detach();
				app.workspace.getLeaf(true).openFile(file);
			}
		}
	}

	public async silentCreate(
		type: DataType,
		name: string,
		campaignId: number,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
	): Promise<void> {
		let folder = '/';
		let settings = CampaignSetting.Agnostic;

		const campaign: CampaignInterface | null = this.app.plugins.getPlugin('rpg-manager').io.getCampaign(campaignId);
		if (campaign != null) {
			settings = campaign.settings;
			folder = campaign.folder;
		}

		const template = this.app.plugins.getPlugin('rpg-manager').factories.templates.create(
			settings,
			type,
			false,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
		);

		const fullPath = folder.substring(1) + DataType[type] + 's';
		if (this.app.vault.getAbstractFileByPath(fullPath) == null){
			await app.vault.createFolder(fullPath);
		}

		const data: string = template.generateData();
		const newFile = await app.vault.create(fullPath + '/' + name + '.md', data);
		const leaf = app.workspace.getLeaf(true);
		await leaf.openFile(newFile);
	}
}
