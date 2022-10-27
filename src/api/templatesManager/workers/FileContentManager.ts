import {parseYaml, TFile} from "obsidian";
import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export class FileContentManager {
	public templateContent: string|undefined;
	public templateFrontMatter: any|undefined;

	constructor(
		private _api: RpgManagerApiInterface,
		private _templateFileName: string,
	) {
	}

	public async parse(
	): Promise<void> {
		const templateFile = this._api.app.vault.getAbstractFileByPath(this._templateFileName) as TFile;
		const content = await this._api.app.vault.read(templateFile);
		const templateContentLines = content.split('\n').map(String);

		let frontmatterContent = '';

		let frontMatterStarted = false;
		let frontMatterCompleted = false;

		templateContentLines.forEach((content: string) => {
			if (!frontMatterCompleted) {
				if (content === '---') {
					if (frontMatterStarted) {
						frontMatterCompleted = true;
					} else {
						frontMatterStarted = true;
					}
				} else {
					if (frontMatterStarted && !frontMatterCompleted) {
						frontmatterContent += content + '\n';
					}
				}
			} else if (!frontMatterStarted){
				frontMatterStarted = true;
				frontMatterCompleted = true;
				if (this.templateContent === undefined) this.templateContent = '';
				this.templateContent += content + '\n';
			} else {
				if (this.templateContent === undefined) this.templateContent = '';
				this.templateContent += content + '\n';
			}
		});

		if (frontmatterContent !== ''){
			this.templateFrontMatter = parseYaml(frontmatterContent);
		}
	}
}
