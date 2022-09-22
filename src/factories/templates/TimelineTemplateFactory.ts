import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";

export class TimelineTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.timelineTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'timeline',
			{
				acts: true,
				events: true,
				births: false,
				deaths: true,
				clues: true,
			}
		);
	}
}
