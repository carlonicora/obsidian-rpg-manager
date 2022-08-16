import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class SceneTemplate extends AbstractTemplate {

	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.sceneTag + '/{adventureId}/{sessionId}/{sceneId}, ' + this.settings.campaignIdentifier +'/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterAction(
	): string {
		return 'action: ""\n';
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' clues: \n' +
			' characters: \n' +
			' locations: \n';
	}

	protected generateFrontmatterTimes(
	): string|null {
		return ' start: \n' +
			' end: \n';
	}

	protected generateTemplate(
	): string {

		let response = '';

		if (this.settings.tooltip){
			response += '\n' +
			'- [ ] Update the name of your scene\n';
		if (this.campaignId === '{campaignId}') {
			response += '- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n';
		}
		response += '- [ ] Replace the `{adventureId}` of the scene tag (' + this.settings.sceneTag + '/**{adventureId}**/{sessionId}/{sceneId}) with an existing adventure id\n' +
			'- [ ] Replace the `{sessionId}` of the scene tag (' + this.settings.sceneTag + '/{adventureId}/**{sessionId}**/{sceneId}) with an existing session id\n' +
			'- [ ] Replace the `{sceneId}` of the scene tag (' + this.settings.sceneTag + '/{adventureId}/{sessionId}/**{sceneId}**) with a valid number unique to the session\n' +
			'- [ ] Remove these tasks\n' +
			'\n'
		}

		response +='```RpgManager\n' +
			'sceneNavigation\n' +
			'```\n' +
			'---\n' +
			'## Trigger\n' +
			'\n' +
			'\n' +
			'## Notes\n' +
			'- \n' +
			'\n' +
			'---\n' +
			'```RpgManager\n' +
			'scene\n' +
			'```\n';

		return response;
	}
}
