import {AbstractComponentTemplateFactory} from "../../../../templates/abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../../controller/interfaces/ControllerMetadataInterface";
import {ClueMetadataInterface} from "../interfaces/ClueMetadataInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";

export class ClueTemplateFactory extends AbstractComponentTemplateFactory {
	protected generateDataCodeBlock(
	): string {
		const metadata: ClueMetadataInterface = {
			data: {
				synopsis: '',
				image: '',
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
