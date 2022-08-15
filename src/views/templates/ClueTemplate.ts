import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class ClueTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.clueTag + ', ' + this.settings.campaignIdentifier +'/{campaignId}]\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' characters: \n' +
			' locations: \n';
	}

	protected generateFrontmatterDates(
	): string|null {
		return ' found: \n';
	}

	protected generateTemplate(
	): string {
		return '\n' +
			'- [ ] Update the name of your clue\n' +
			'- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n' +
			'- [ ] Remove these tasks\n' +
			'\n' +
			'\n' +
			'\n' +
			'---\n' +
			'```RpgManager\n' +
			'clue\n' +
			'```\n' +
			'---\n' +
			'\n' +
			'## Additional Information\n';
	}
}
