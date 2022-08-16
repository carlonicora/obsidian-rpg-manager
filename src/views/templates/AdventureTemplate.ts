import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class AdventureTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.adventureTag + '/{adventureId}, ' + this.settings.campaignIdentifier +'/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateTemplate(
	): string {
		let response = '';

		if (this.settings.tooltip){
			response += '\n' +
				'- [ ] Update the name of your adventure\n';
				if (this.campaignId === '{campaignId}') {
					response += '- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n';
				}
				response += '- [ ] Replace the `{adventureId}` of the adventure tag (' + this.settings.adventureTag + '/**{adventureId}**) with a valid number unique to the campaign\n' +
				'- [ ] Remove these tasks\n' +
				'\n';
		}

		response += '## Plot\n\n' +
			'>\n' +
			'>\n' +
			'>\n' +
			'>**AND** \n' +
			'>\n' +
			'>**BUT** \n' +
			'>\n' +
			'>**THEREFORE** \n' +
			'>\n' +
			'\n' +
			'## Notes\n' +
			'- \n\n' +
			'---\n' +
			'```RpgManager\n' +
			'adventure\n' +
			'```';

		return response;
	}
}
