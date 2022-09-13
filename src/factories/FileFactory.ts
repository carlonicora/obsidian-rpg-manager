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
		templateName: string,
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
			templateName,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
			additionalInformation,
		);

		const fileName = await this.generateFilePath(type, folder, name);

		template.generateData()
			.then((data: string) => {
				if (create) {
					this.createNewFile(data, fileName);
				} else {
					this.editExistingFile(data, fileName);
				}
			});
	}

	private async createNewFile(
		data: string,
		fileName: string,
	): Promise<void> {
		const newFile = await app.vault.create(fileName, data);
		const currentLeaf = app.workspace.getActiveViewOfType(MarkdownView);
		const leaf = app.workspace.getLeaf((currentLeaf != null));
		await leaf.openFile(newFile);
	}

	private async editExistingFile(
		data: string,
		fileName: string,
	): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView != null) {
			const editor = activeView.editor;
			editor.setValue(data + '\n' + editor.getValue());

			let file = activeView.file;
			await this.app.fileManager.renameFile(file, fileName);
			file = activeView.file;

			app.workspace.getLeaf().openFile(file);
		}
	}

	public async silentCreate(
		type: DataType,
		name: string,
		campaignId: number,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
		additionalInformation: any|null = null,
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
			'internal' + DataType[type],
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
			additionalInformation,
		);

		const fileName = await this.generateFilePath(type, folder, name);

		const data: string = await template.generateData();
		const newFile = await app.vault.create(fileName, data);
		const leaf = app.workspace.getLeaf(true);
		await leaf.openFile(newFile);
	}

	private async generateFilePath(
		type: DataType,
		folder: string,
		name: string,
	): Promise<string> {
		let response = name + '.md';

		if (this.app.plugins.getPlugin('rpg-manager').settings.automaticMove){
			let fullPath: string;
			if (type !== DataType.Campaign) {
				fullPath = folder + DataType[type] + 's';
				if (fullPath.startsWith('/')) fullPath = fullPath.substring(1);
				if (this.app.vault.getAbstractFileByPath(fullPath) == null) {
					await app.vault.createFolder(fullPath);
				}
			} else {
				fullPath = folder;
				if (fullPath.startsWith('/')) fullPath = fullPath.substring(1);
			}

			response = fullPath + '/' + response;
		}

		return response;
	}
}
