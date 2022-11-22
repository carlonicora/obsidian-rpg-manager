import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {AdventureMetadataInterface} from "../interfaces/AdventureMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";
import {IndexDataInterface} from "../../../services/indexService/interfaces/IndexDataInterface";
import {SorterService} from "../../../services/sorterService/SorterService";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";
import {SorterType} from "../../../services/searchService/enums/SorterType";
import {IndexService} from "../../../services/indexService/IndexService";
import {AdventureInterface} from "../interfaces/AdventureInterface";

export class AdventureTemplate extends AbstractComponentTemplate {
	protected generateDataCodeBlock(
	): string {
		const metadata: AdventureMetadataInterface = {
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
					acts: {
						relationship: 'hierarchy'
					}
				}
			}
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): IndexDataInterface {
		const previousAdventures = this.api.database.read<AdventureInterface>((adventure: AdventureInterface) =>
			adventure.index.type === ComponentType.Adventure &&
			adventure.index.campaignId === this.campaignId
		).sort(
			this.api.service(SorterService).create<AdventureInterface>([
				new SorterComparisonElement((adventure: AdventureInterface) => adventure.index.positionInParent, SorterType.Descending),
			])
		);

		const positionInParent = previousAdventures.length === 0 ?
			1 :
			previousAdventures[0].index.positionInParent + 1;

		if (this.adventureId === undefined)
			this.adventureId = this.api.service(IndexService).createUUID();

		return {
			type: ComponentType.Adventure,
			campaignSettings: CampaignSetting.Agnostic,
			id: this.adventureId,
			campaignId: this.campaignId,
			positionInParent: positionInParent,
		};
	}
}
