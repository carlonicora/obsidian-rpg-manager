import {AbstractTemplateFactory} from "../../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../../interfaces/RpgCodeBlockInterface";
import {RpgCodeBlock} from "../../../helpers/RpgCodeBlock";

export class CharacterTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.pcTag + '/' + this.campaignId);
		frontmatter.synopsis = "";
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
			'pc',
		);
	}
}
