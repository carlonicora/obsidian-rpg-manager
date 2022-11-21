import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {SceneType} from "../../analyserService/enums/SceneType";

export interface RunningTimeServiceInterface {
	medianTimes: Map<string, Map<SceneType, number[]>>;

	get isTimerRunning(): boolean;

	getTypeExpectedDuration(
		campaignId: string,
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
