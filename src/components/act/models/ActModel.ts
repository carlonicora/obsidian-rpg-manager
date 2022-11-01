import {ActInterface} from "../interfaces/ActInterface";
import {ComponentStage} from "../../../core/enums/ComponentStage";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ActMetadataInterface} from "../interfaces/ActMetadataInterface";
import {AbstractActData} from "../abstracts/AbstractActData";
import {ComponentNotFoundError} from "../../../core/errors/ComponentNotFoundError";
import {DatabaseInterface} from "../../../managers/databaseManager/interfaces/DatabaseInterface";
import {RelationshipListInterface} from "../../../services/relationshipsService/interfaces/RelationshipListInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {RelationshipService} from "../../../services/relationshipsService/RelationshipService";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";

export class ActModel extends AbstractActData implements ActInterface {
	protected metadata: ActMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	public validateHierarchy(
	): void {
		super.validateHierarchy();
		try {
			this.adventure.validateHierarchy();
		} catch (e) {
			throw new ComponentNotFoundError(this.api, this.id);
		}
	}

	public get adventure(): AdventureInterface {
		const response = this.api.database.readSingle<AdventureInterface>(ComponentType.Adventure, this.id);

		if (response === undefined)
			throw new Error('');

		return response;
	}

	public get nextAct(): ActInterface | null {
		return this._adjacentAct(true);
	}

	public get previousAct(): ActInterface | null {
		return this._adjacentAct(false);
	}

	private _adjacentAct(
		next: boolean,
	): ActInterface | null {
		const actId = this.id.actId;

		if (actId === undefined)
			return null;

		const response = this.api.database.read<ActInterface>((act: ActInterface) =>
			act.id.type === ComponentType.Act &&
			act.id.campaignId === this.id.campaignId &&
			act.id.actId === (next ? actId + 1 : actId -1)
		);

		return response[0] ?? null;
	}

	getRelationships(
		database?: DatabaseInterface
	): RelationshipListInterface {
		const response: RelationshipListInterface = super.getRelationships(database);

		this.api.database.read<ModelInterface>((model: ModelInterface) =>
			model.id.campaignId === this.id.campaignId &&
			model.id.adventureId === this.id.adventureId &&
			model.id.actId === this.id.actId
		).forEach((model: ModelInterface) => {
			if (model.id.type === ComponentType.Scene){
				model.getRelationships().forEach((sceneRelationship: RelationshipInterface) => {
					if (sceneRelationship.component !== undefined)
						response.add(this.api.service(RelationshipService).createRelationship(
							RelationshipType.Unidirectional,
							sceneRelationship.path,
							undefined,
							sceneRelationship.component,
						));

				});
			}

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
