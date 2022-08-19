import {DataType} from "../io/IoData";
import {Api} from "../api";
import * as Templates from '../views/templates';
import {TemplateInterface} from "../interfaces/TemplateInterface";
import {MarkdownView} from "obsidian";

export class FileFactory {
	constructor(
		private api: Api,
	) {
	}

	async initialise(
		type: DataType,
		create = true,
	): Promise<void>
	{
		let name: string|null|undefined = null;

		if (create === false){
			name = this.api.app.workspace.getActiveFile()?.basename;
		}

		//@ts-ignore
		new Templates[DataType[type] + 'Modal'](this.api, type, create, name).open();
	}

	async create(
		type: DataType,
		create: boolean,
		name: string,
		campaignId: number,
		adventureId: number|null = null,
		sessionId: number|null = null,
		sceneId: number|null = null,
	): Promise<void> {
		//@ts-ignore
		const template: TemplateInterface = new Templates[DataType[type] + 'Template'](
			this.api.settings,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
		);
		const data: string = template.generateData();

		if (create) {
			const newFile = await this.api.app.vault.create(name + '.md', data);
			const leaf = this.api.app.workspace.getLeaf(false);
			await leaf.openFile(newFile);
		} else {
			const activeView = this.api.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView != null) {
				const editor = activeView.editor;
				editor.setValue(data);
			}
		}
	}
}
