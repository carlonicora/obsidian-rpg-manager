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
			throw new ComponentNotFoundError(this.api, this.index);
		}
	}

	public get adventure(): AdventureInterface {
		const response = this.api.database.readSingle<AdventureInterface>(ComponentType.Adventure, this.index);

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
		const actId = this.index.actId;

		if (actId === undefined)
			return null;

		const response = this.api.database.read<ActInterface>((act: ActInterface) =>
			act.index.type === ComponentType.Act &&
			act.index.campaignId === this.index.campaignId &&
			act.index.actId === (next ? actId + 1 : actId -1)
		);

		return response[0] ?? null;
	}

	getRelationships(
		database?: DatabaseInterface
	): RelationshipListInterface {
		const response: RelationshipListInterface = super.getRelationships(database);

		this.api.database.read<ModelInterface>((model: ModelInterface) =>
			model.index.campaignId === this.index.campaignId &&
			model.index.adventureId === this.index.adventureId &&
			model.index.actId === this.index.actId
		).forEach((model: ModelInterface) => {
			if (model.index.type === ComponentType.Scene){
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
