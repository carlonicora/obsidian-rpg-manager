import {CampaignInterface} from "../interfaces/CampaignInterface";
import {ComponentStage} from "../../../core/enums/ComponentStage";
import {CampaignMetadataInterface} from "../interfaces/CampaignMetadataInterface";
import {AbstractCampaignData} from "../abstracts/AbstractCampaignData";
import {DatabaseInterface} from "../../../managers/databaseManager/interfaces/DatabaseInterface";
import {RelationshipListInterface} from "../../../services/relationshipsService/interfaces/RelationshipListInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {RelationshipService} from "../../../services/relationshipsService/RelationshipService";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";

export class CampaignModel extends AbstractCampaignData implements CampaignInterface {
	protected metadata: CampaignMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	public get folder(
	): string {
		const lastSlashPosition = this.file.path.lastIndexOf('/');

		return (lastSlashPosition !== -1 ? this.file.path.substring(0, lastSlashPosition + 1) : '/');
	}

	getRelationships(
		database?: DatabaseInterface,
	): RelationshipListInterface {
		const response: RelationshipListInterface = super.getRelationships(database);

		this.api.database.read<ModelInterface>((model: ModelInterface) =>
			model.index.campaignId === this.index.campaignId
		).forEach((model: ModelInterface) => {
			response.add(this.api.service(RelationshipService).createRelationship(
				RelationshipType.Hierarchy,
				model.file.path,
				undefined,
				model,
			));
		});

		return response;
	}
}
