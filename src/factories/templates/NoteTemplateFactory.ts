import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";

export class NoteTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.noteTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.sessionId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'note',
		);
	}
}
