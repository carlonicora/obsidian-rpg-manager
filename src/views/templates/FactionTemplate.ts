import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class FactionTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.factionTag + ', ' + this.settings.campaignIdentifier +'/{campaignId}]\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' locations: \n';
	}

	protected generateTemplate(
	): string {
		return '\n' +
			'- [ ] Update the name of your faction\n' +
			'- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n' +
			'- [ ] Remove these tasks\n' +
			'\n' +
			'\n' +
			'\n' +
			'---\n' +
			'```RpgManager\n' +
			'faction\n' +
			'```\n' +
			'---\n' +
			'\n' +
			'## Additional Information\n';
	}
}
