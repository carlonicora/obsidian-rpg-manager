import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {RunningTimeManagerInterface} from "../interfaces/dataManipulation/RunningTimeManagerInterface";
import {SceneType} from "../enums/SceneType";
import {ComponentType} from "../enums/ComponentType";
import {SceneV2Interface} from "../_dbV2/components/interfaces/SceneV2Interface";
import {CampaignV2Interface} from "../_dbV2/components/interfaces/CampaignV2Interface";

export class RunningTimeManager extends AbstractRpgManager implements RunningTimeManagerInterface {
	public currentlyRunningScene: SceneV2Interface|undefined = undefined;
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
		scene: SceneV2Interface,
	): boolean {
		if (this.currentlyRunningScene === undefined) return false;

		return this.currentlyRunningScene.id === scene.id;
	}

	public async startScene(
		scene: SceneV2Interface,
	): Promise<void> {
		if (this.currentlyRunningScene !== undefined) await this.stopScene(this.currentlyRunningScene);
		this.currentlyRunningScene = scene;

		await this.factories.codeblock.startNewDuration(this.currentlyRunningScene.file);
	}

	public async stopScene(
		scene: SceneV2Interface,
	): Promise<void> {
		if (this.currentlyRunningScene === undefined) return;

		await this.factories.codeblock.stopCurrentDuration(this.currentlyRunningScene.file)
		this.currentlyRunningScene = undefined;
	}

	public async updateMedianTimes(
		isStartup=false,
	): Promise<void> {
		const campaigns: Array<CampaignV2Interface> = this.database.read<CampaignV2Interface>((campaign: CampaignV2Interface) =>
			campaign.id.type === ComponentType.Campaign
		);

		for (let index=0; index<campaigns.length; index++){
			this.medianTimes.set(campaigns[index].id.campaignId, structuredClone(this.medianDefaultTimes));
		}

		const scenes: Array<SceneV2Interface> = this.database.read<SceneV2Interface>((scene: SceneV2Interface) =>
			scene.id.type === ComponentType.Scene
		);

		await scenes.forEach((scene: SceneV2Interface) => {
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
