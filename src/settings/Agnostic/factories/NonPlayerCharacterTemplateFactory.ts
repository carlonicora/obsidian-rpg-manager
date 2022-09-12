import {AbstractTemplateFactory} from "../../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../../interfaces/RpgCodeBlockInterface";
import {RpgCodeBlock} from "../../../helpers/RpgCodeBlock";

export class NonPlayerCharacterTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.npcTag + '/' + this.campaignId);
		frontmatter.synopsis = "";
		frontmatter.goals = "",
		frontmatter.relationships = {
			characters: {},
			locations: {},
			factions: {},
		};
		frontmatter.pronoun = "";
		frontmatter.dates = {
			dob: "",
			death: "",
		}
	}

	public generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock(
			'npc',
		);
	}

	public generateLastCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return undefined;
	}
}

