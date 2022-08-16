import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class LocationTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.locationTag + ', ' + this.settings.campaignIdentifier +'/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterAddress(
	): string {
		return 'address: ""\n';
	}

	protected generateTemplate(
	): string {

		let response = '';

		if (this.settings.tooltip){
			response += '\n' +
			'- [ ] Update the name of your location\n';
		if (this.campaignId === '{campaignId}') {
			response += '- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n';
		}
		response += '- [ ] Remove these tasks\n' +
			'\n'
		}

		response +='```RpgManager\n' +
			'location\n' +
			'```\n' +
			'---\n' +
			'\n' +
			'## Additional Information\n';

		return response;
	}
}
