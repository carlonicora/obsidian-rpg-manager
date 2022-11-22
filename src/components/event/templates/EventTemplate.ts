import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {EventMetadataInterface} from "../interfaces/EventMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";
import {IndexDataInterface} from "../../../services/indexService/interfaces/IndexDataInterface";
import {IndexService} from "../../../services/indexService/IndexService";

export class EventTemplate extends AbstractComponentTemplate {
	protected generateDataCodeBlock(
	): string {
		const metadata: EventMetadataInterface = {
			data: {
				synopsis: '',
				complete: false,
				date: ''
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
					clues: {},
					locations: {},
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): IndexDataInterface {
		return {
			type: ComponentType.Event,
			campaignSettings: CampaignSetting.Agnostic,
			id: this.api.service(IndexService).createUUID(),
			campaignId: this.campaignId,
			parentId: this.parentId,
			positionInParent: 0,
		};
	}
}

