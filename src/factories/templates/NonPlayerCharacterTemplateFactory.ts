import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";

export class NonPlayerCharacterTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.npcTag + '/' + this.campaignId);
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

