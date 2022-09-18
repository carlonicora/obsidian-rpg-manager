import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../interfaces/RpgCodeBlockInterface";

export class ClueTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.clueTag + '/' + this.campaignId);
		frontmatter.relationships = {
			characters: {},
			locations: {},
		};
		frontmatter.dates = {
			found: {},
		};
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock('clue');
	}
}
