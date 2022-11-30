import {SceneInterface} from "../interfaces/SceneInterface";
import {SceneMetadataInterface} from "../interfaces/SceneMetadataInterface";
import {ComponentStage} from "../../../core/enums/ComponentStage";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SessionInterface} from "../../session/interfaces/SessionInterface";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {AbstractSceneData} from "../abstracts/AbstractSceneData";
import {ComponentNotFoundError} from "../../../core/errors/ComponentNotFoundError";
import {RunningTimeService} from "../../../services/runningTimeService/RunningTimeService";
import {activeSceneTypes} from "../../../services/analyserService/enums/SceneType";

export class SceneModel extends AbstractSceneData implements SceneInterface {
	protected metadata: SceneMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;

	public validateHierarchy(
	): void {
		super.validateHierarchy();
		try {
			this.act.validateHierarchy();
		} catch (e) {
			throw new ComponentNotFoundError(this.api, this.index);
		}
	}

	get act(): ActInterface {
		return this.api.database.readById<ActInterface>(this.index.parentId);
	}

	get adventure(): AdventureInterface {
		return this.api.database.readById<AdventureInterface>(this.act.index.parentId);
	}

	get currentDuration(): number {
		if (this.metadata.data?.durations === undefined || this.metadata.data?.durations.length === 0)
			return 0;

		let response = 0;

		for (let index=0; index<this.metadata.data.durations.length; index++){
			const duration = this.metadata.data.durations[index];

			if (duration.indexOf('-') === -1)
				continue;

			const [start, end] = duration.split('-');
			response += (+end - +start);
		}

		return response;
	}

	get duration(): string {
		if (this.currentDuration === 0)
			return '00:00';

		const hours: number = Math.floor(this.currentDuration / (60 * 60));
		const minutes: number = Math.floor((this.currentDuration - (hours * 60 * 60))/60);

		return (hours < 10 ? '0' + hours.toString() : hours.toString()) +
			':' +
			(minutes < 10 ? '0' + minutes.toString() : minutes.toString());
	}

	get expectedDuration(): number {
		if (this.sceneType == undefined)
			return 0;

		const previousDurations: number[] = this.api.service(RunningTimeService).medianTimes.get(this.index.campaignId)?.get(this.sceneType) ?? [];
		previousDurations.sort((left: number, right: number) => {
			if (left > right) return +1;
			if (left < right) return -1;
			return 0;
		});

		if (previousDurations.length === 0)
			return 0;

		if (previousDurations.length === 1)
			return previousDurations[0];

		if (previousDurations.length % 2 === 0){
			const previous = previousDurations[previousDurations.length/2];
			const next = previousDurations[(previousDurations.length/2)-1];
			return Math.floor((previous+next)/2);
		} else {
			return previousDurations[(previousDurations.length-1)/2];
		}
	}

	get isActive(): boolean {
		if (this.sceneType == undefined)
			return false;

		return activeSceneTypes.get(this.sceneType) ?? false;
	}

	get isCurrentlyRunning(): boolean {
		if (this.metadata.data?.durations == undefined)
			return false;

		for (let index=0; index<this.metadata.data?.durations.length; index++) {
			if (this.metadata.data?.durations[index].indexOf('-') === -1) return true;
		}

		return false;
	}

	get lastStart(): number {
		if (!this.isCurrentlyRunning || this.metadata.data?.durations == undefined)
			return 0;

		for (let index=0; index<this.metadata.data?.durations.length; index++) {
			if (this.metadata.data?.durations[index].indexOf('-') === -1) return +this.metadata.data?.durations[index];
		}

		return 0;
	}

	get nextScene(): SceneInterface | null {
		return this._adjacentScene(true);
	}

	get previousScene(): SceneInterface | null {
		return this._adjacentScene(false);
	}

	get session(): SessionInterface | undefined {
		if (this.metadata?.data?.sessionId === undefined || this.metadata.data.sessionId === '')
			return undefined;

		const sessions: SessionInterface[] = this.api.database.read<SessionInterface>((session: SessionInterface) =>
			session.index.type === ComponentType.Session &&
			session.index.campaignId === this.index.campaignId &&
			session.index.id === this.metadata.data?.sessionId
		);

		if (sessions.length !== 1)
			return undefined;

		return sessions[0];
	}

	get positionInSession(
	): number|undefined {
		return this.metadata?.data?.positionInSession;
	}

	private _adjacentScene(
		next: boolean,
	): SceneInterface | null {
		try {
			return this.api.database.readNeighbour<SceneInterface>(ComponentType.Scene, this.index, !next);
		} catch (e) {
			return null;
		}
	}
}
