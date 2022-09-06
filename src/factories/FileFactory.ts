import {App, MarkdownView} from "obsidian";
import {DataType} from "../enums/DataType";
import {ModalFactory, SingleModalKey} from "./ModalFactory";
import {CampaignSetting} from "../enums/CampaignSetting";
import {SingleTemplateKey, TemplateFactory} from "./TemplateFactory";
import {DataviewApi} from "obsidian-dataview/lib/api/plugin-api";
import {RpgFunctions} from "../RpgFunctions";

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
		const settings = this.getSettings(campaignId);

		const template = TemplateFactory.create(
			CampaignSetting[settings] + DataType[type] as SingleTemplateKey<any>,
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
		const settings = this.getSettings(campaignId);

		const template = TemplateFactory.create(
			CampaignSetting[settings] + DataType[type] as SingleTemplateKey<any>,
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
		campaignId: number|null,
	): CampaignSetting {
		let response: CampaignSetting = CampaignSetting.Agnostic;

		if (campaignId != null){
			const io:DataviewApi = app.plugins.plugins.dataview.api;
			const campaigns = io.pages('#' + RpgFunctions.settings.campaignTag + '/' + campaignId);

			if (campaigns != null && campaigns.length === 1){
				response = CampaignSetting[campaigns[0].settings as keyof typeof CampaignSetting];
			}
		}

		return response;
	}
}
