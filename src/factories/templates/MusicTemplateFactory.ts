import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../interfaces/RpgCodeBlockInterface";
import {RpgCodeBlock} from "../../helpers/RpgCodeBlock";

export class MusicTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.musicTag + '/' + this.campaignId);
		frontmatter.url = this?.additionalInformation?.url ?? "";
		frontmatter.relationships = {
			music: {},
		};
	}

	public generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock('music');
	}
}
