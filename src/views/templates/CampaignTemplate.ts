import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class CampaignTemplate extends AbstractTemplate{
    protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.campaignTag +'/{campaignId}]\n';
	}

	protected generateFrontmatterDates(
	): string|null {
		return ' current: \n';
	}

	protected generateTemplate(
	): string {
		let response = '';

		if (this.settings.tooltip){
			response += '\n' +
				'- [ ] Update the name of your campaign\n' +
				'- [ ] Replace the `{campaignId}` of the campaign tag (' + this.settings.campaignTag + '/**{campaignId}**) with a valid number unique to the vault\n' +
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
			'---\n' +
			'```RpgManager\n' +
			'campaign\n' +
			'```';

		return response;
	}
}
