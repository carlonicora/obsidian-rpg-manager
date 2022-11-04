import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {FactionMetadataInterface} from "../interfaces/FactionMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";

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
	): string {
		return ComponentType.Faction + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}
