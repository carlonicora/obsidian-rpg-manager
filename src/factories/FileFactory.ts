import {App, MarkdownView} from "obsidian";
import {DataType} from "../enums/DataType";
import {ModalFactory, SingleModalKey} from "./ModalFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {SingleTemplateKey, TemplateFactory} from "./TemplateFactory";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";

export class FileFactory {
	static async initialise(
		app: App,
		type: DataType,
		create = true,
	): Promise<void>
	{
		let name: string|null = null;

		if (create === false){
			const activeFile = app.workspace.getActiveFile();
			if (activeFile != null) {
				name = activeFile.basename;
			}
		}

		ModalFactory.open(DataType[type] as SingleModalKey<any>, app, type, create, name);
	}

	static async create(
		app: App,
		type: DataType,
		create: boolean,
		createFrontMatterOnly: boolean,
		name: string,
		campaignId: number|null=null,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
	): Promise<void> {
		const settings = this.getSettings(app, campaignId);

		const template = TemplateFactory.create(
			CampaignSetting[settings] + DataType[type] as SingleTemplateKey<any>,
			app,
			createFrontMatterOnly,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
		);

		const data: string = template.generateData();

		if (create) {
			const newFile = await app.vault.create(name + '.md', data);
			const leaf = app.workspace.getLeaf(true);
			await leaf.openFile(newFile);
		} else {
			const activeView = app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView != null) {
				const editor = activeView.editor;
				editor.setValue(data + '\n' + editor.getValue());
			}
		}
	}

	static async silentCreate(
		app: App,
		type: DataType,
		name: string,
		campaignId: number,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
	): Promise<void> {
		const settings = this.getSettings(app, campaignId);

		const template = TemplateFactory.create(
			CampaignSetting[settings] + DataType[type] as SingleTemplateKey<any>,
			app,
			false,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
		);

		const data: string = template.generateData();
		const newFile = await app.vault.create(name + '.md', data);
		const leaf = app.workspace.getLeaf(true);
		await leaf.openFile(newFile);
	}

	private static getSettings(
		app: App,
		campaignId: number|null,
	): CampaignSetting {
		let response: CampaignSetting = CampaignSetting.Agnostic;

		if (campaignId != null){
			const campaign: CampaignInterface|null = app.plugins.getPlugin('rpg-manager').io.getCampaign(campaignId);

			if (campaign != null){
				response = campaign.settings;
			}
		}

		return response;
	}
}
