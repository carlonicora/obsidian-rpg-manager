import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../interfaces/RpgCodeBlockInterface";
import {RpgCodeBlock} from "../../helpers/RpgCodeBlock";

export class LocationTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.locationTag + '/' + this.campaignId);
		frontmatter.synopsis = "";
		frontmatter.address = "";
		frontmatter.relationships = {
			locations: {},
		};
	}

	public generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock('location');
	}
}
