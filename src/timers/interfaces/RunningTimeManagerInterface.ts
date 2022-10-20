import {SceneType} from "../../components/enums/SceneType";
import {SceneInterface} from "../../components/components/scene/interfaces/SceneInterface";

export interface RunningTimeManagerInterface{
	currentlyRunningScene: SceneInterface|undefined;
	medianTimes: Map<number, Map<SceneType, number[]>>;

	get isTimerRunning(): boolean;

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

	getTypeExpectedDuration(
		campaignId: number,
		type: SceneType,
	): number;
}
