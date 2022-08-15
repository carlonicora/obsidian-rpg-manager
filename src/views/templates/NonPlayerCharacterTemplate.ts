import {AbstractTemplate} from "../../abstracts/AbstractTemplate";

export class NonPlayerCharacterTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.npcTag + ', ' + this.settings.campaignIdentifier +'/{campaignId}]\n';
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
		return '\n' +
			'- [ ] Update the name of your non player character\n' +
			'- [ ] Replace the `{campaignId}` of the campaign tag identifier (' + this.settings.campaignIdentifier + '/**{campaignId}**) with an existing campaign id\n' +
			'- [ ] Remove these tasks\n' +
			'\n' +
			'\n' +
			'---\n' +
			'```RpgManager\n' +
			'npc\n' +
			'```\n' +
			'---\n' +
			'\n' +
			'## Notes\n' +
			'\n' +
			'\n' +
			'## Story\n';
	}
}
