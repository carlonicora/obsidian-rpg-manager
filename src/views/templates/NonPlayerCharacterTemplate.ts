import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class NonPlayerCharacterTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.npcTag + '/' + this.campaignId + ']\n';
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
		let response = this.getRpgManagerCodeblock('npc');
		response += this.getNotes();
		response += this.getStory();

		return response;
	}
}

export class NonPlayerCharacterModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}

