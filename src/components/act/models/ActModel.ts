import {ActInterface} from "../interfaces/ActInterface";
import {ComponentStage} from "../../../core/enums/ComponentStage";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ActMetadataInterface} from "../interfaces/ActMetadataInterface";
import {AbstractActData} from "../abstracts/AbstractActData";
import {ComponentNotFoundError} from "../../../core/errors/ComponentNotFoundError";
import {DatabaseInterface} from "../../../managers/databaseManager/interfaces/DatabaseInterface";
import {RelationshipListInterface} from "../../../services/relationshipsService/interfaces/RelationshipListInterface";
import {RelationshipService} from "../../../services/relationshipsService/RelationshipService";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {SceneInterface} from "../../scene/interfaces/SceneInterface";

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
		return this.api.database.readById<AdventureInterface>(this.index.parentId);
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
		const response = this.api.database.read<ActInterface>((act: ActInterface) =>
			act.index.type === ComponentType.Act &&
			act.index.campaignId === this.index.campaignId &&
			act.index.positionInParent === (next ? act.index.positionInParent + 1 : act.index.positionInParent -1)
		);

		return response[0] ?? null;
	}

	getRelationships(
		database?: DatabaseInterface
	): RelationshipListInterface {
		const response: RelationshipListInterface = super.getRelationships(database);

		this.api.database.read<SceneInterface>((scene: SceneInterface) =>
			scene.index.type === ComponentType.Scene &&
			scene.index.campaignId === this.index.campaignId &&
			scene.index.parentId === this.index.id
		).forEach((scene: SceneInterface) => {
			scene.getRelationships().forEach((sceneRelationship: RelationshipInterface) => {
				if (sceneRelationship.component !== undefined)
					response.add(this.api.service(RelationshipService).createRelationship(
						RelationshipType.Unidirectional,
						sceneRelationship.path,
						undefined,
						sceneRelationship.component,
					));

			});

			response.add(this.api.service(RelationshipService).createRelationship(
				RelationshipType.Hierarchy,
				scene.file.path,
				undefined,
				scene,
			));
		});

		return response;
	}
}
