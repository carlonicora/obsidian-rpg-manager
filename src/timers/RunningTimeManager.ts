import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {RunningTimeManagerInterface} from "./interfaces/RunningTimeManagerInterface";
import {SceneType} from "../components/enums/SceneType";
import {ComponentType} from "../components/enums/ComponentType";
import {SceneInterface} from "../components/components/scene/interfaces/SceneInterface";
import {CampaignInterface} from "../components/components/campaign/interfaces/CampaignInterface";

export class RunningTimeManager extends AbstractRpgManager implements RunningTimeManagerInterface {
	public currentlyRunningScene: SceneInterface|undefined = undefined;
	public medianDefaultTimes: Map<SceneType, Array<number>> = new Map<SceneType, Array<number>>([
		[SceneType.Action, [15*60]],
		[SceneType.Combat, [15*60]],
		[SceneType.Encounter, [15*60]],
		[SceneType.Exposition, [5*60]],
		[SceneType.Investigation, [15*60]],
		[SceneType.Planning, [10*60]],
		[SceneType.Preparation, [10*60]],
		[SceneType.Recap, [5*60]],
		[SceneType.SocialCombat, [15*60]],
	]);

	public medianTimes: Map<number, Map<SceneType, Array<number>>> = new Map<number, Map<SceneType, Array<number>>>([
		[
			0,
			this.medianDefaultTimes,
		]
	]);

	public get isTimerRunning(
	): boolean {
		return this.currentlyRunningScene !== undefined;
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

		await this.manipulators.codeblock.startNewDuration(this.currentlyRunningScene.file);
	}

	public async stopScene(
		scene: SceneInterface,
	): Promise<void> {
		if (this.currentlyRunningScene === undefined) return;

		await this.manipulators.codeblock.stopCurrentDuration(this.currentlyRunningScene.file)
		this.currentlyRunningScene = undefined;
	}

	public async updateMedianTimes(
		isStartup=false,
	): Promise<void> {
		const campaigns: Array<CampaignInterface> = this.database.read<CampaignInterface>((campaign: CampaignInterface) =>
			campaign.id.type === ComponentType.Campaign
		);

		for (let index=0; index<campaigns.length; index++){
			this.medianTimes.set(campaigns[index].id.campaignId, structuredClone(this.medianDefaultTimes));
		}

		const scenes: Array<SceneInterface> = this.database.read<SceneInterface>((scene: SceneInterface) =>
			scene.id.type === ComponentType.Scene
		);

		await scenes.forEach((scene: SceneInterface) => {
			if (isStartup && scene.isCurrentlyRunning) {
				this.currentlyRunningScene = scene;
				this.stopScene(scene);
			}
			if (scene.sceneType !== undefined && scene.currentDuration !== undefined && scene.currentDuration !== 0) {
				const campaignMedians: Map<SceneType, Array<number>> | undefined = this.medianTimes.get(scene.id.campaignId);
				if (campaignMedians !== undefined) {
					const sessionTypeTimes: Array<number>|undefined = campaignMedians.get(scene.sceneType);
					if (sessionTypeTimes !== undefined) sessionTypeTimes.push(scene.currentDuration);
				}
			}
		});
	}
}
