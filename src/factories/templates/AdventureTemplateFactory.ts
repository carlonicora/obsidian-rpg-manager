import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";

export class AdventureTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.adventureTag + '/' + this.campaignId + '/' + this.adventureId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'adventureNavigation',
			{
				abt: {
					need: "",
					and: "",
					but: "",
					therefore: "",
				},
			}
		);
	}

	public generateLastCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'adventure',
		);
	}
}
