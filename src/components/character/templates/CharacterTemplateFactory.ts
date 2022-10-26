import {AbstractComponentTemplateFactory} from "../../../../REFACTOR/abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../api/controllerManager/interfaces/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../interfaces/CharacterMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";

export class CharacterTemplateFactory extends AbstractComponentTemplateFactory {
	protected generateDataCodeBlock(
	): string {
		const metadata: CharacterMetadataInterface = {
			data: {
				synopsis: '',
				complete: false,
				dob: '',
				death: '',
				goals: '',
				pronoun: ''
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
					pcs: {
						relationship: "unidirectional",
					},
					npcs: {
						relationship: "unidirectional",
					},
					factions: {},
					locations: {},
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Character + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}
