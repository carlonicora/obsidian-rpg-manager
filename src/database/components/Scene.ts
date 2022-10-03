import {SceneInterface} from "./interfaces/SceneInterface";
import {SceneMetadataInterface} from "../interfaces/metadata/components/SceneMetadataInterface";
import {ComponentStage} from "./enums/ComponentStage";
import {ActInterface} from "./interfaces/ActInterface";
import {SessionInterface} from "./interfaces/SessionInterface";
import {AdventureInterface} from "./interfaces/AdventureInterface";
import {ComponentType} from "../../enums/ComponentType";
import {AbstractSceneData} from "./abstracts/data/AbstractSceneData";

export class Scene extends AbstractSceneData implements SceneInterface {
	protected metadata: SceneMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	get act(): ActInterface {
		const response = this.database.readSingle<ActInterface>(ComponentType.Act, this.id);
		if (response === undefined) throw new Error('');

		return response;
	}

	get adventure(): AdventureInterface {
		const response = this.database.readSingle<AdventureInterface>(ComponentType.Adventure, this.id);
		if (response === undefined) throw new Error('');

		return response;
	}

	get currentDuration(): number {
		return 0;
	}

	get duration(): string {
		return "";
	}

	get expectedDuration(): number {
		return 0;
	}

	get isActive(): boolean {
		return false;
	}

	get isCurrentlyRunning(): boolean {
		return false;
	}

	get isExciting(): boolean {
		return false;
	}

	get lastStart(): number {
		return 0;
	}

	get nextScene(): SceneInterface | null {
		return this._adjacentScene(true);
	}

	get previousScene(): SceneInterface | null {
		return this._adjacentScene(false);
	}

	get session(): SessionInterface | null {
		if (this.metadata.data?.sessionId === undefined) return null;

		const response = this.database.read<SessionInterface>((session: SessionInterface) =>
			session.id.type === ComponentType.Session &&
			session.id.sessionId === this.metadata.data?.sessionId
		);

		return response[0] ?? null;
	}

	private _adjacentScene(
		next: boolean,
	): SceneInterface | null {
		const sceneId = this.id.sceneId;
		if (sceneId === undefined) return null;

		try {
			return this.database.readSingle<SceneInterface>(ComponentType.Scene, this.id, (next ? sceneId + 1 : sceneId - 1));
		} catch (e) {
			return null
		}
	}
}
