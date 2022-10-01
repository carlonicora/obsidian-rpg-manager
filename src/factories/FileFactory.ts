import {MarkdownView} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {CampaignSetting} from "../enums/CampaignSetting";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {FileFactoryInterface} from "../interfaces/factories/FileFactoryInterface";
import {IdInterface} from "../interfaces/IdInterface";
import {CampaignV2Interface} from "../_dbV2/components/interfaces/CampaignV2Interface";

const path = require('path');

export class FileFactory extends AbstractFactory implements FileFactoryInterface{
	public async create(
		settings: CampaignSetting,
		type: ComponentType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: IdInterface,
		adventureId: IdInterface|undefined=undefined,
		actId: IdInterface|undefined=undefined,
		sceneId: IdInterface|undefined=undefined,
		sessionId: IdInterface|undefined=undefined,
		additionalInformation: any|null=null,
	): Promise<void> {
		let folder = path.sep;

		try {
			const campaign: CampaignV2Interface|undefined = this.app.plugins.getPlugin('rpg-manager').database.readSingle<CampaignV2Interface>(ComponentType.Campaign, campaignId);
			settings = campaign.campaignSettings;
			folder = campaign.folder;
		} catch (e) {
			//no need to catch it here
		}

		const template = this.app.plugins.getPlugin('rpg-manager').factories.templates.create(
			settings,
			type,
			templateName,
			name,
			campaignId.id,
			adventureId?.id,
			actId?.id,
			sceneId?.id,
			sessionId?.id,
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
		type: ComponentType,
		name: string,
		campaignId: number,
		adventureId: number|undefined=undefined,
		actId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		additionalInformation: any|undefined=undefined,
	): Promise<void> {
		let folder = '';
		let settings = CampaignSetting.Agnostic;

		let campaign: CampaignV2Interface|undefined;
		const id = this.factories.id.create(ComponentType.Campaign, campaignId);

		if (id !== undefined){
			try {
				campaign = this.app.plugins.getPlugin('rpg-manager').database.readSingle<CampaignV2Interface>(ComponentType.Campaign, id);
			} catch (e) {
				campaign = undefined;
			}
		}

		if (campaign !== undefined) {
			settings = campaign.campaignSettings;
			folder = campaign.folder;
		}

		const template = this.app.plugins.getPlugin('rpg-manager').factories.templates.create(
			settings,
			type,
			'internal' + ComponentType[type],
			name,
			campaignId,
			adventureId,
			actId,
			sceneId,
			sessionId,
			additionalInformation,
		);

		const fileName = await this.generateFilePath(type, folder, name);

		const data: string = await template.generateData();
		const newFile = await app.vault.create(fileName, data);
		const leaf = app.workspace.getLeaf(true);
		await leaf.openFile(newFile);
	}

	private async generateFilePath(
		type: ComponentType,
		folder: string,
		name: string,
	): Promise<string> {
		if (folder.startsWith(path.sep)) folder = folder.substring(path.sep.length);
		if (folder.endsWith(path.sep)) folder = folder.substring(0, folder.length - path.sep.length);
		let response = name + '.md';

		if (this.settings.automaticMove){
			let fullPath: string;
			if (type !== ComponentType.Campaign) {
				fullPath = folder + path.sep + ComponentType[type] + 's';

				if (fullPath.startsWith(path.sep)) fullPath = fullPath.substring(path.sep.length);

				const fileOrFolder = await this.app.vault.getAbstractFileByPath(fullPath);
				if (fileOrFolder == null) {
					try {
						await this.app.vault.createFolder(fullPath);
					} catch (e) {
						//no need to catch any error here
					}
				}
			} else {
				fullPath = folder;
				if (fullPath.startsWith(path.sep)) fullPath = fullPath.substring(1);
			}

			response = fullPath + path.sep + response;
		}

		return response;
	}
}
