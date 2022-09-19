import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";

export class EventTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.eventTag + '/' + this.campaignId);
		frontmatter.dates = {
			event: {},
		};
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock('event');
	}
}

