import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";

export class NonPlayerCharacterTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.npcTag + '/' + this.campaignId);
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

