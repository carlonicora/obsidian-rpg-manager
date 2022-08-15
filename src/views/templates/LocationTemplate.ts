import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class LocationTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.locationTag + ', ' + this.settings.campaignIdentifier +'/{campaignId}]\n';
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
		return '\n' +
			'- [ ] Update the name of your location\n' +
			'- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n' +
			'- [ ] Remove these tasks\n' +
			'\n' +
			'\n' +
			'\n' +
			'---\n' +
			'```RpgManager\n' +
			'location\n' +
			'```\n' +
			'---\n' +
			'\n' +
			'## Additional Information\n';
	}
}
