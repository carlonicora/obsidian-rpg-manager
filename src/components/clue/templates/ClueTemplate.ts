import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {ClueMetadataInterface} from "../interfaces/ClueMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";

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
	): string {
		return ComponentType.Clue + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}
