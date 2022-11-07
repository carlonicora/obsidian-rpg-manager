import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {SceneType} from "../../analyserService/enums/SceneType";
import {TFile} from "obsidian";

export interface RunningTimeServiceInterface {
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
