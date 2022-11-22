import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {FactionMetadataInterface} from "../interfaces/FactionMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";
import {IndexDataInterface} from "../../../services/indexService/interfaces/IndexDataInterface";
import {IndexService} from "../../../services/indexService/IndexService";

export class FactionTemplate extends AbstractComponentTemplate {
	protected generateDataCodeBlock(
	): string {
		const metadata: FactionMetadataInterface = {
			data: {
				synopsis: '',
				complete: false
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
					pcs: {},
					npcs: {},
					locations: {},
					subplots: {}
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): IndexDataInterface {
		return {
			type: ComponentType.Faction,
			campaignSettings: CampaignSetting.Agnostic,
			id: this.api.service(IndexService).createUUID(),
			campaignId: this.campaignId,
			parentId: this.parentId,
			positionInParent: 0,
		};
	}
}
