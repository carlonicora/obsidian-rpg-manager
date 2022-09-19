import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";

export class LocationTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.locationTag + '/' + this.campaignId);
		frontmatter.address = "";
		frontmatter.relationships = {
			locations: {},
		};
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock('location');
	}
}
