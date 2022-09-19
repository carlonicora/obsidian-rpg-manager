import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";

export class MusicTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.musicTag + '/' + this.campaignId);
		frontmatter.url = this?.additionalInformation?.url ?? "";
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock('music');
	}
}
