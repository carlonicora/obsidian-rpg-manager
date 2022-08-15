import {DataType} from "../io/IoData";
import {Api} from "../api";
import * as Templates from '../views/templates';
import {TemplateInterface} from "../interfaces/TemplateInterface";

export class FileFactory {
	constructor(
		private api: Api,
	) {
	}

	async create(
		type: DataType,
	): Promise<void>
	{
		//@ts-ignore
		const template: TemplateInterface = new Templates[DataType[type] + 'Template'](this.api.settings);
		const data: string = template.generateData();

		const newFile = await this.api.app.vault.create(DataType[type] + '.md', data);

		const leaf = this.api.app.workspace.getLeaf(false);

		await leaf.openFile(newFile);
	}
}
