import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";
import {RpgFunctions} from "../../../RpgFunctions";

export class NonPlayerCharacterTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + RpgFunctions.settings.npcTag + '/' + this.campaignId + ']\n';
	}

	protected generateFrontmatterSynopsis(
	): string {
		return 'synopsis: ""\n';
	}

	protected generateFrontmatterGoals(
	): string {
		return 'goals: ""\n';
	}

	protected generateFrontmatterAdditionalInformation(
	): string {
		return 'pronoun: #t/s/h\n';
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
		let response = this.getRpgManagerCodeblock('npc');
		response += this.getNotes();
		response += this.getStory();

		return response;
	}
}

