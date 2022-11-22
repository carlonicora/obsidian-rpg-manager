import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {ActMetadataInterface} from "../interfaces/ActMetadataInterface";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {AbstractComponentTemplate} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";
import {IndexDataInterface} from "../../../services/indexService/interfaces/IndexDataInterface";
import {IndexService} from "../../../services/indexService/IndexService";
import {ActInterface} from "../interfaces/ActInterface";
import {SorterService} from "../../../services/sorterService/SorterService";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";
import {SorterType} from "../../../services/searchService/enums/SorterType";

export class ActTemplate extends AbstractComponentTemplate {
	protected generateDataCodeBlock(
	): string {
		const metadata: ActMetadataInterface = {
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
				complete: false,
				abtStage: ''
			}
		};

		return this.generateRpgManagerDataCodeBlock(metadata);
	}

	public generateInitialCodeBlock(
	): string {
		const metadata: ControllerMetadataInterface = {
			models: {
				header: true
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface = {
			models: {
				lists: {
					scenes: {
						relationship: 'hierarchy'
					},
					pcs: {
						relationship: 'unidirectional'
					},
					npcs: {
						relationship: 'unidirectional'
					},
					clues: {
						relationship: 'unidirectional'
					},
					locations: {
						relationship: 'unidirectional'
					},
					factions: {
						relationship: 'unidirectional'
					}
				}
			}
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): IndexDataInterface {
		const previousActs = this.api.database.read<ActInterface>((act: ActInterface) =>
			act.index.type === ComponentType.Act &&
			act.index.campaignId === this.campaignId &&
			act.index.parentId === this.parentId
		).sort(
			this.api.service(SorterService).create<ActInterface>([
				new SorterComparisonElement((act: ActInterface) => act.index.positionInParent, SorterType.Descending),
			])
		);

		const positionInParent = previousActs.length === 0 ?
			1 :
			previousActs[0].index.positionInParent + 1;

		if (this.id === undefined)
			this.id = this.api.service(IndexService).createUUID();

		return {
			type: ComponentType.Act,
			campaignSettings: CampaignSetting.Agnostic,
			campaignId: this.campaignId,
			parentId: this.parentId,
			id: this.id,
			positionInParent: positionInParent,
		};
	}
}
