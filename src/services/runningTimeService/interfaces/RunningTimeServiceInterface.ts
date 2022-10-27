import {SceneType} from "../../../../REFACTOR/services/analyserService/enums/SceneType";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";

export interface RunningTimeServiceInterface {
	currentlyRunningScene: SceneInterface|undefined;
	medianTimes: Map<number, Map<SceneType, number[]>>;

	get isTimerRunning(): boolean;

	getTypeExpectedDuration(
		campaignId: number,
		type: SceneType,
	): number;

	isCurrentlyRunningScene(
		scene: SceneInterface,
	): boolean;

	startScene(
		scene: SceneInterface,
	): Promise<void>;

	stopScene(
		scene: SceneInterface,
	): Promise<void>;

	updateMedianTimes(
		isStartup?: boolean,
	): Promise<void>;
}
