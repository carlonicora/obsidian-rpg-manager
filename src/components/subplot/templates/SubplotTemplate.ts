import {ControllerMetadataInterface} from "../../../api/controllerManager/interfaces/ControllerMetadataInterface";
import {SubplotMetadataInterface} from "../interfaces/SubplotMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../api/templatesManager/abstracts/AbstractComponentTemplate";

export class SubplotTemplate extends AbstractComponentTemplate {
	protected generateDataCodeBlock(
	): string {
		const metadata: SubplotMetadataInterface = {
			plot: {
				abt: {
					need: '',
					and: '',
					but: '',
					therefore: '',
				},
				storycircle: {
					you: '',
					need: '',
					go: '',
					search: '',
					find: '',
					take: '',
					return: '',
					change: '',
				}
			},
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
					events: {},
					clues: {},
					factions: {},
					npcs: {},
					locations: {},
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Subplot + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}
