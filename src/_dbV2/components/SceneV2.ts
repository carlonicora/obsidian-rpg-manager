import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {SceneV2Interface} from "./interfaces/SceneV2Interface";
import {SceneMetadataInterface} from "../interfaces/metadatas/SceneMetadataInterface";
import {ComponentStage} from "./enums/ComponentStage";
import {ActV2Interface} from "./interfaces/ActV2Interface";
import {StoryCircleStage} from "../../enums/StoryCircleStage";
import {SessionV2Interface} from "./interfaces/SessionV2Interface";
import {SceneType} from "../../enums/SceneType";
import {AdventureV2Interface} from "./interfaces/AdventureV2Interface";
import {ComponentType} from "../../enums/ComponentType";

export class SceneV2 extends AbstractComponentV2 implements SceneV2Interface {
	protected metadata: SceneMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	get act(): ActV2Interface {
		const response = this.database.readSingle<ActV2Interface>(ComponentType.Act, this.id);
		if (response === undefined) throw new Error('');

		return response;
	}

	get action(): string | undefined {
		return this.metadata.action;
	}

	get adventure(): AdventureV2Interface {
		const response = this.database.readSingle<AdventureV2Interface>(ComponentType.Adventure, this.id);
		if (response === undefined) throw new Error('');

		return response;
	}

	get currentDuration(): number {
		return 0;
	}

	get date(): Date | undefined {
		return (this.metadata.date ? new Date(this.metadata.date) : undefined);
	}

	get duration(): string {
		return "";
	}

	get expectedDuration(): number {
		return 0;
	}

	get isActedUpon(): boolean | undefined {
		return undefined;
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

	get nextScene(): SceneV2Interface | null {
		return this._adjacentScene(true);
	}

	get previousScene(): SceneV2Interface | null {
		return this._adjacentScene(false);
	}

	get sceneType(): SceneType | undefined {
		return this.metadata.sceneType;
	}

	get session(): SessionV2Interface | null {
		if (this.metadata.sessionId === undefined) return null;

		const response = this.database.read<SessionV2Interface>((session: SessionV2Interface) =>
			session.id.type === ComponentType.Session &&
			session.id.sessionId === this.metadata.sessionId
		);

		return response[0] ?? null;
	}

	get storycircleStage(): StoryCircleStage | undefined {
		return this.metadata.storyCircleStage;
	}

	private _adjacentScene(
		next: boolean,
	): SceneV2Interface | null {
		const sceneId = this.id.sceneId;
		if (sceneId === undefined) return null;

		try {
			return this.database.readSingle<SceneV2Interface>(ComponentType.Scene, this.id, (next ? sceneId + 1 : sceneId - 1));
		} catch (e) {
			return null
		}
	}
}
