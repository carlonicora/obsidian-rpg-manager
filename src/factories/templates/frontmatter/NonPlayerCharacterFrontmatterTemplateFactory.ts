import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";

export class NonPlayerCharacterFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.npcTag + '/' + this.campaignId);
		frontmatter.image = "";
		frontmatter.goals = "",
		frontmatter.pronoun = "";
		frontmatter.dates = {
			dob: {},
			death: {},
		}
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'npc',
		);
	}

	public generateLastCodeBlock(
	): string|undefined {
		return undefined;
	}
}
