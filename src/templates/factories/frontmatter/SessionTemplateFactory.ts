import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {SessionMetadataInterface} from "../../../metadatas/components/SessionMetadataInterface";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {CampaignSetting} from "../../../databases/enums/CampaignSetting";

export class SessionTemplateFactory extends AbstractComponentTemplateFactory {
	protected generateDataCodeBlock(
	): string {
		const metadata: SessionMetadataInterface = {
			data: {
				synopsis: '',
				image: '',
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
		}

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Session + '-' + CampaignSetting.Agnostic + '-' + this.campaignId + '/' + this.sessionId;
	}
}
