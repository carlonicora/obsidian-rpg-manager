import {SceneType} from "../../enums/SceneType";
import {SceneV2Interface} from "../../_dbV2/components/interfaces/SceneV2Interface";

export interface RunningTimeManagerInterface{
	currentlyRunningScene: SceneV2Interface|undefined;
	medianTimes: Map<number, Map<SceneType, Array<number>>>;

	get isTimerRunning(): boolean;

	isCurrentlyRunningScene(
		scene: SceneV2Interface,
	): boolean;

	startScene(
		scene: SceneV2Interface,
	): Promise<void>;

	stopScene(
		scene: SceneV2Interface,
	): Promise<void>;

	updateMedianTimes(
		isStartup?: boolean,
	): Promise<void>;
}
