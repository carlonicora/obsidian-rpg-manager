import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {SessionMetadataInterface} from "../interfaces/SessionMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";
import {IndexDataInterface} from "../../../services/indexService/interfaces/IndexDataInterface";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {SorterService} from "../../../services/sorterService/SorterService";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";
import {SorterType} from "../../../services/searchService/enums/SorterType";
import {IndexService} from "../../../services/indexService/IndexService";
import {SessionInterface} from "../interfaces/SessionInterface";

export class SessionTemplate extends AbstractComponentTemplate {
	protected generateDataCodeBlock(
	): string {
		const metadata: SessionMetadataInterface = {
			data: {
				synopsis: '',
				complete: false,
				irl: undefined,
				abtStage: undefined
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
					scenes: {
						relationship: "hierarchy",
					},
				}
			},
		};
return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface = {
			models: {
				lists: {
					subplots: {
						relationship: "hierarchy",
					},
					musics: {
						relationship: "hierarchy",
					},
					pcs: {
						relationship: "hierarchy",
					},
					npcs: {
						relationship: "hierarchy",
					},
					factions: {
						relationship: "hierarchy",
					},
					clues: {
						relationship: "hierarchy",
					},
					locations: {
						relationship: "hierarchy",
					},
					events: {
						relationship: "hierarchy",
					},
				}
			}
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): IndexDataInterface {
		let positionInParent = 1;

		if (this.positionInParent == undefined) {
			const previousSessions = this.api.database.read<AdventureInterface>((session: SessionInterface) =>
				session.index.type === ComponentType.Session &&
				session.index.campaignId === this.campaignId
			).sort(
				this.api.service(SorterService).create<SessionInterface>([
					new SorterComparisonElement((session: SessionInterface) => session.index.positionInParent, SorterType.Descending),
				])
			);

			positionInParent = previousSessions.length === 0 ?
				1 :
				previousSessions[0].index.positionInParent + 1;
		} else {
			positionInParent = this.positionInParent;
		}

		if (this.sessionId === undefined)
			this.sessionId = this.api.service(IndexService).createUUID();

		return {
			type: ComponentType.Session,
			campaignSettings: CampaignSetting.Agnostic,
			id: this.sessionId,
			campaignId: this.campaignId,
			positionInParent: positionInParent,
		};
	}
}
