import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class SessionTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.sessionTag + '/{adventureId}/{sessionId}, ' + this.settings.campaignIdentifier +'/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterDates(
	): string|null {
		return ' session: \n' +
			' irl: \n';
	}

	protected generateTemplate(
	): string {

		let response = '';

		if (this.settings.tooltip){
			response += '\n' +
			'- [ ] Update the name of your session\n';
		if (this.campaignId === '{campaignId}') {
			response += '- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n';
		}
		response += '- [ ] Replace the `{adventureId}` of the session tag (' + this.settings.sessionTag + '/**{adventureId}**/{sessionId}) with an existing adventure id\n' +
			'- [ ] Replace the `{sessionId}` of the session tag (' + this.settings.sessionTag + '/{adventureId}/**{sessionId}**) with a valid number unique to the adventure\n' +
			'- [ ] Remove these tasks\n' +
			'\n'
		}

		response +='```RpgManager\n' +
			'sessionNavigation\n' +
			'```\n' +
			'---\n' +
			'## Introduction' +
			'\n' +
			'\n' +
			'## Plot\n' +
			'### ABT Plot\n\n' +
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
			'### Story Circle Plot\n\n' +
			'>\n' +
			'>**YOU**: \n' +
			'>**NEED**: \n' +
			'>**GO**: \n' +
			'>**SEARCH**: \n' +
			'>**FIND**: \n' +
			'>**TAKE**: \n' +
			'>**RETURN**: \n' +
			'>**CHANGE**: \n' +
			'>\n' +
			'\n' +
			'---\n' +
			'```RpgManager\n' +
			'session\n' +
			'```\n';

		return response;
	}
}
