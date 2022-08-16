import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class NonPlayerCharacterTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.npcTag + ', ' + this.settings.campaignIdentifier +'/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterGoals(
	): string {
		return 'goals: ""\n';
	}

	protected generateFrontmatterRelationships(
	): string|null {
		return ' characters: \n' +
			' factions: \n' +
		' locations: \n';
	}


	protected generateFrontmatterDates(
	): string|null {
		return ' dob: \n' +
			' death: \n';
	}

	protected generateTemplate(
	): string {

		let response = '';

		if (this.settings.tooltip){
			response += '\n' +
			'- [ ] Update the name of your non player character\n';
		if (this.campaignId === '{campaignId}') {
			response += '- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n';
		}
		response += '- [ ] Remove these tasks\n' +
			'\n'
		}

		response +='```RpgManager\n' +
			'npc\n' +
			'```\n' +
			'---\n' +
			'\n' +
			'## Notes\n' +
			'\n' +
			'\n' +
			'## Story\n';

		return response;
	}
}
