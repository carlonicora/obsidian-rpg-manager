import {ControllerMetadataInterface} from "../../../api/controllerManager/interfaces/ControllerMetadataInterface";
import {SessionMetadataInterface} from "../interfaces/SessionMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../api/templatesManager/abstracts/AbstractComponentTemplate";

export class SessionTemplate extends AbstractComponentTemplate {
	protected generateDataCodeBlock(
	): string {
		const metadata: SessionMetadataInterface = {
			data: {
				synopsis: '',
				complete: false,
				irl: undefined,
				abtStage: undefined
			}
		};

		return this.generateRpgManagerDataCodeBlock(metadata);
	}

	public generateInitialCodeBlock(
	): string {
		const metadata: ControllerMetadataInterface = {
			models: {
				header: true,
				lists: {
					scenes: {
						relationship: "hierarchy",
					},
				}
			},
		};
return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface = {
			models: {
				lists: {
					subplots: {
						relationship: "hierarchy",
					},
					musics: {
						relationship: "hierarchy",
					},
					pcs: {
						relationship: "hierarchy",
					},
					npcs: {
						relationship: "hierarchy",
					},
					factions: {
						relationship: "hierarchy",
					},
					clues: {
						relationship: "hierarchy",
					},
					locations: {
						relationship: "hierarchy",
					},
					events: {
						relationship: "hierarchy",
					},
				}
			}
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Session + '-' + CampaignSetting.Agnostic + '-' + this.campaignId + '/' + this.sessionId;
	}
}
