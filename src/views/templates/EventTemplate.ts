import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class EventTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.eventTag + ', ' + this.settings.campaignIdentifier +'/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' characters: \n' +
			' clues: \n' +
			' locations: \n';
	}

	protected generateFrontmatterDates(
	): string|null {
		return ' event: \n';
	}

	protected generateTemplate(
	): string {

		let response = '';

		if (this.settings.tooltip){
			response += '\n' +
			'- [ ] Update the name of your event\n';
		if (this.campaignId === '{campaignId}') {
			response += '- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n';
		}
		response += '- [ ] Remove these tasks\n' +
			'\n' +
			'---\n'
		}

		response +='```RpgManager\n' +
			'event\n' +
			'```\n' +
			'---\n' +
			'\n' +
			'## Additional Information\n';

		return response;
	}
}
