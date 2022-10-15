import {MarkdownView} from "obsidian";
import {ComponentType} from "../../components/enums/ComponentType";
import {CampaignSetting} from "../../components/components/campaign/enums/CampaignSetting";
import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {FileFactoryInterface} from "./interfaces/FileFactoryInterface";
import {IdInterface} from "../../id/interfaces/IdInterface";
import {CampaignInterface} from "../../components/components/campaign/interfaces/CampaignInterface";

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
			const campaign: CampaignInterface|undefined = this.app.plugins.getPlugin('rpg-manager').database.readSingle<CampaignInterface>(ComponentType.Campaign, campaignId);
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

		const fileName = await this._generateFilePath(type, folder, name);

		template.generateData()
			.then((data: string) => {
				if (create) {
					this._createNewFile(data, fileName);
				} else {
					this._editExistingFile(data, fileName);
				}
			});
	}

	private async _createNewFile(
		data: string,
		fileName: string,
	): Promise<void> {
		const newFile = await app.vault.create(fileName, data);
		const currentLeaf = app.workspace.getActiveViewOfType(MarkdownView);
		const leaf = app.workspace.getLeaf((currentLeaf != null));
		await leaf.openFile(newFile);
	}

	private async _editExistingFile(
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

		let campaign: CampaignInterface|undefined;
		const id = this.factories.id.create(ComponentType.Campaign, campaignId);

		if (id !== undefined){
			try {
				campaign = this.app.plugins.getPlugin('rpg-manager').database.readSingle<CampaignInterface>(ComponentType.Campaign, id);
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

		const fileName = await this._generateFilePath(type, folder, name);

		const data: string = await template.generateData();
		const newFile = await app.vault.create(fileName, data);
		const leaf = app.workspace.getLeaf(true);
		await leaf.openFile(newFile);
	}

	private async _generateFilePath(
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
