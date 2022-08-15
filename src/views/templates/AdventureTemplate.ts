import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class AdventureTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.adventureTag + '/{adventureId}, ' + this.settings.campaignIdentifier +'/{campaignId}]\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateTemplate(
	): string {
		return '\n' +
			'- [ ] Update the name of your adventure\n' +
			'- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n' +
			'- [ ] Replace the `{adventureId}` of the adventure tag (' + this.settings.adventureTag + '/**{adventureId}**) with a valid number unique to the campaign\n' +
			'- [ ] Remove these tasks\n' +
			'\n' +
			'## Plot\n\n' +
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
	}
}
