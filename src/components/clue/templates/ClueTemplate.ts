import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {ClueMetadataInterface} from "../interfaces/ClueMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";
import {IndexDataInterface} from "../../../services/indexService/interfaces/IndexDataInterface";
import {IndexService} from "../../../services/indexService/IndexService";

export class ClueTemplate extends AbstractComponentTemplate {
	protected generateDataCodeBlock(
	): string {
		const metadata: ClueMetadataInterface = {
			data: {
				synopsis: '',
				complete: false,
				found: ''
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
					subplots: {},
					pcs: {},
					npcs: {},
					locations: {},
					clues: {},
					events: {},
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): IndexDataInterface {
		return {
			type: ComponentType.Clue,
			campaignSettings: CampaignSetting.Agnostic,
			id: this.api.service(IndexService).createUUID(),
			campaignId: this.campaignId,
			parentId: this.campaignId,
			positionInParent: 0,
		};
	}
}
