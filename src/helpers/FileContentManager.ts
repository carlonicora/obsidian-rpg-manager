import {App, parseYaml, TFile} from "obsidian";

export class FileContentManager {
	public templateContent: string|undefined;
	public templateFrontMatter: any|undefined;

	constructor(
		private app: App,
		private templateFileName: string,
	) {
	}

	public async parse(
	): Promise<void> {
		const templateFile = this.app.vault.getAbstractFileByPath(this.templateFileName) as TFile;
		const content = await this.app.vault.read(templateFile);
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
