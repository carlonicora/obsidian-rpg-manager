import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {RunningTimeManagerInterface} from "../interfaces/dataManipulation/RunningTimeManagerInterface";
import {SceneInterface} from "../interfaces/components/SceneInterface";

export class RunningTimeManager extends AbstractRpgManager implements RunningTimeManagerInterface {
	public currentlyRunningScene: SceneInterface|undefined = undefined;

	public get isTimerRunning(
	): boolean {
		return this.currentlyRunningScene !== undefined;
	}

	public async evaluateLeafChange(
	): Promise<void> {
		return Promise.resolve(undefined);
	}

	public isCurrentlyRunningScene(
		scene: SceneInterface,
	): boolean {
		if (this.currentlyRunningScene === undefined) return false;

		return this.currentlyRunningScene.id === scene.id;
	}

	public async startScene(
		scene: SceneInterface,
	): Promise<void> {
		if (this.currentlyRunningScene !== undefined) await this.stopScene(this.currentlyRunningScene);
		this.currentlyRunningScene = scene;

		this.factories.codeblock.startNewDuration(this.currentlyRunningScene.file);
	}

	public async stopScene(
		scene: SceneInterface,
	): Promise<void> {
		if (this.currentlyRunningScene === undefined) return;

		this.factories.codeblock.stopCurrentDuration(this.currentlyRunningScene.file)
		this.currentlyRunningScene = undefined;
	}
}
