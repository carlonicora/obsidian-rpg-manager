import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";

export class TimelineTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.timelineTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'timeline',
			{
				sessions: true,
				events: true,
				births: false,
				deaths: true,
				clues: true,
			}
		);
	}
}
