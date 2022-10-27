import {MarkdownView} from "obsidian";
import {ComponentType} from "../../core/enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {FileCreationServiceInterface} from "./interfaces/FileCreationServiceInterface";
import {IdInterface} from "../idService/interfaces/IdInterface";
import {CampaignInterface} from "../../components/campaign/interfaces/CampaignInterface";
import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {IdService} from "../idService/IdService";

const path = require('path');

export class FileCreationService extends AbstractService implements FileCreationServiceInterface, ServiceInterface{
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
		let pathSeparator = '';

		try {
			pathSeparator = path.sep;
		} catch (e) {
			pathSeparator = '/';
		}

		let folder = pathSeparator;

		try {
			const campaign: CampaignInterface|undefined = this.api.database.readSingle<CampaignInterface>(ComponentType.Campaign, campaignId);
			settings = campaign.campaignSettings;
			folder = campaign.folder;
		} catch (e) {
			//no need to catch it here
		}

		const template = this.api.app.plugins.getPlugin('rpg-manager').factories.templates.create(
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

		const fileName = await this._generateFilePath(type, folder, name, pathSeparator);

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
			await this.api.app.fileManager.renameFile(file, fileName);
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
		openView?: boolean,
	): Promise<void> {
		let folder = '';
		let settings = CampaignSetting.Agnostic;

		let campaign: CampaignInterface|undefined;
		const id = this.api.service(IdService).create(ComponentType.Campaign, campaignId);

		if (id !== undefined){
			try {
				campaign = this.api.database.readSingle<CampaignInterface>(ComponentType.Campaign, id);
			} catch (e) {
				campaign = undefined;
			}
		}

		if (campaign !== undefined) {
			settings = campaign.campaignSettings;
			folder = campaign.folder;
		}

		const template = this.api.app.plugins.getPlugin('rpg-manager').factories.templates.create(
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

		const fileName = await this._generateFilePath(type, folder, name, '/');

		const data: string = await template.generateData();
		const newFile = await app.vault.create(fileName, data);

		if (openView) {
			const leaf = app.workspace.getLeaf(true);
			await leaf.openFile(newFile);
		}
	}

	private async _generateFilePath(
		type: ComponentType,
		folder: string,
		name: string,
		pathSeparator: string,
	): Promise<string> {
		if (folder.startsWith(pathSeparator)) folder = folder.substring(pathSeparator.length);
		if (folder.endsWith(pathSeparator)) folder = folder.substring(0, folder.length - pathSeparator.length);
		let response = name + '.md';

		if (this.api.settings.automaticMove){
			let fullPath: string;
			if (type !== ComponentType.Campaign) {
				fullPath = folder + pathSeparator + ComponentType[type] + 's';

				if (fullPath.startsWith(pathSeparator)) fullPath = fullPath.substring(pathSeparator.length);

				const fileOrFolder = await this.api.app.vault.getAbstractFileByPath(fullPath);
				if (fileOrFolder == null) {
					try {
						await this.api.app.vault.createFolder(fullPath);
					} catch (e) {
						//no need to catch any error here
					}
				}
			} else {
				fullPath = folder;
				if (fullPath.startsWith(pathSeparator)) fullPath = fullPath.substring(1);
			}

			response = fullPath + pathSeparator + response;
		}

		return response;
	}
}
