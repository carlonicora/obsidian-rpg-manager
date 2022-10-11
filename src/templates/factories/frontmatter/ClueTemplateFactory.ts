import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {ClueMetadataInterface} from "../../../metadatas/components/ClueMetadataInterface";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {CampaignSetting} from "../../../databases/enums/CampaignSetting";

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
