import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";

export class NoteTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.noteTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.sessionId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'note',
		);
	}
}
