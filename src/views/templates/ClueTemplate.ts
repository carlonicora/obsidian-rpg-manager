import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class ClueTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.clueTag + ', ' + this.settings.campaignIdentifier +'/' + this.campaignId + ']\n';
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

		let response = '';

		if (this.settings.tooltip){
			response += '\n' +
			'- [ ] Update the name of your clue\n';
		if (this.campaignId === '{campaignId}') {
			response += '- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n';
		}
		response += '- [ ] Remove these tasks\n' +
			'\n' +
			'---\n'
		}

		response +='```RpgManager\n' +
			'clue\n' +
			'```\n' +
			'---\n' +
			'\n' +
			'## Additional Information\n';

		return response;
	}
}
