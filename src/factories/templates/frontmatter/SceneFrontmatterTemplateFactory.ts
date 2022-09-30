import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";

export class SceneFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.sceneTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.actId + '/' + this.sceneId);
		frontmatter.date = {};
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'sceneNavigation',
			{
				trigger: "",
				action: "",
			},
		);
	}

	public generateLastCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'scene',
		);
	}
}

