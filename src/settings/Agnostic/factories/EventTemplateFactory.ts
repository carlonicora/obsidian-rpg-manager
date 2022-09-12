import {AbstractTemplateFactory} from "../../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../../interfaces/RpgCodeBlockInterface";
import {RpgCodeBlock} from "../../../helpers/RpgCodeBlock";

export class EventTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.eventTag + '/' + this.campaignId);
		frontmatter.synopsis = "";
		frontmatter.relationships = {
			characters: {},
			clues: {},
			locations: {},
		};
		frontmatter.dates = {
			event: {},
		};
	}

	public generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock('event');
	}
}

