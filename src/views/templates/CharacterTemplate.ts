import {AbstractTemplate} from "../../abstracts/AbstractTemplate";
import {AbstractTemplateModal} from "../../abstracts/AbstractTemplateModal";

export class CharacterTemplate extends AbstractTemplate {

	protected generateFrontmatterTags(
	): string {
		return 'tags: [' + this.settings.pcTag + '/' + this.campaignId + ']\n';
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
		let response = this.getRpgManagerCodeblock('pc');
		response += this.getPlayerCharacterDetails();

		return response;
	}
}

export class CharacterModal extends AbstractTemplateModal {
	protected content(
		contentEl: HTMLElement,
	): void {
		this.campaignBlock(contentEl);
	}
}
