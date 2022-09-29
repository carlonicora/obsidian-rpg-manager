import {SceneInterface} from "../components/SceneInterface";

export interface RunningTimeManagerInterface{
	currentlyRunningScene: SceneInterface|undefined;

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

	evaluateLeafChange(
	): Promise<void>;
}
