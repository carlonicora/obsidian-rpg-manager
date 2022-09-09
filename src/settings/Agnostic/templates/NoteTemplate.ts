import {AbstractTemplate} from "../../../abstracts/AbstractTemplate";

export class NoteTemplate extends AbstractTemplate {
	protected generateFrontmatterTags(): string {
		return 'tags: [' + this.app.plugins.getPlugin('rpg-manager').settings.noteTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.sessionId +']\n';
	}

	protected generateTemplate(): string {
		return "";
	}

}
