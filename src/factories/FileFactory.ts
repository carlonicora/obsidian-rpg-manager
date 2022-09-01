import * as Modals from '../settings/Agnostic/modals';
import * as Templates from '../settings/Agnostic/templates';
import {TemplateInterface} from "../interfaces/data/TemplateInterface";
import {App, MarkdownView} from "obsidian";
import {DataType} from "../enums/DataType";
import {RpgFunctions} from "../RpgFunctions";

export class FileFactory {
	constructor(
		private app: App,
	) {
	}

	async initialise(
		type: DataType,
		create = true,
	): Promise<void>
	{
		let name: string|null|undefined = null;

		if (create === false){
			name = this.app.workspace.getActiveFile()?.basename;
		}

		//@ts-ignore
		new Modals[DataType[type] + 'Modal'](this.api, type, create, name).open();
	}

	async create(
		type: DataType,
		create: boolean,
		createFrontMatterOnly: boolean,
		name: string,
		campaignId: number,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
	): Promise<void> {
		//@ts-ignore
		const template: TemplateInterface = new Templates[DataType[type] + 'Template'](
			RpgFunctions.settings,
			createFrontMatterOnly,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
		);
		const data: string = template.generateData();

		if (create) {
			const newFile = await this.app.vault.create(name + '.md', data);
			const leaf = this.app.workspace.getLeaf(true);
			await leaf.openFile(newFile);
		} else {
			const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView != null) {
				const editor = activeView.editor;
				editor.setValue(data + '\n' + editor.getValue());
			}
		}
	}

	async silentCreate(
		type: DataType,
		name: string,
		campaignId: number,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
	): Promise<void> {
		//@ts-ignore
		const template: TemplateInterface = new Templates[DataType[type] + 'Template'](
			RpgFunctions.settings,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
		);
		const data: string = template.generateData();
		const newFile = await this.app.vault.create(name + '.md', data);
		const leaf = this.app.workspace.getLeaf(true);
		await leaf.openFile(newFile);
	}
}
