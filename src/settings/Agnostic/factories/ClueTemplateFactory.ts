import {AbstractTemplateFactory} from "../../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../../interfaces/RpgCodeBlockInterface";
import {RpgCodeBlock} from "../../../helpers/RpgCodeBlock";

export class ClueTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.clueTag + '/' + this.campaignId);
		frontmatter.synopsis = "";
		frontmatter.relationships = {
			characters: {},
			locations: {},
		};
		frontmatter.dates = {
			found: {},
		};
	}

	public generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock('clue');
	}
}
