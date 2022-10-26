import {AbstractRpgManager} from "../../core/abstracts/AbstractRpgManager";
import {RunningTimeServiceInterface} from "./interfaces/RunningTimeServiceInterface";
import {SceneType} from "../../components/scene/enums/SceneType";
import {ComponentType} from "../../core/enums/ComponentType";
import {SceneInterface} from "../../components/scene/interfaces/SceneInterface";
import {CampaignInterface} from "../../components/campaign/interfaces/CampaignInterface";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {App} from "obsidian";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";

export class RunningTimeService extends AbstractService implements RunningTimeServiceInterface, ServiceInterface {
	public currentlyRunningScene: SceneInterface|undefined = undefined;

	private _medianDefaultTimes: Map<SceneType, number[]> = new Map<SceneType, number[]>([
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

	public medianTimes: Map<number, Map<SceneType, number[]>> = new Map<number, Map<SceneType, number[]>>([
		[
			0,
			this._medianDefaultTimes,
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

		//todo fix
		//await this.manipulators.codeblock.startNewDuration(this.currentlyRunningScene.file);
	}

	public async stopScene(
		scene: SceneInterface,
	): Promise<void> {
		if (this.currentlyRunningScene === undefined) return;

		//todo fix
		//await this.manipulators.codeblock.stopCurrentDuration(this.currentlyRunningScene.file)
		this.currentlyRunningScene = undefined;
	}

	public async updateMedianTimes(
		isStartup=false,
	): Promise<void> {
		const campaigns: CampaignInterface[] = this.api.database.read<CampaignInterface>((campaign: CampaignInterface) =>
			campaign.id.type === ComponentType.Campaign
		);

		for (let index=0; index<campaigns.length; index++){
			this.medianTimes.set(campaigns[index].id.campaignId, structuredClone(this._medianDefaultTimes));
		}

		const scenes: SceneInterface[] = this.api.database.read<SceneInterface>((scene: SceneInterface) =>
			scene.id.type === ComponentType.Scene
		);

		await scenes.forEach((scene: SceneInterface) => {
			if (isStartup && scene.isCurrentlyRunning) {
				this.currentlyRunningScene = scene;
				this.stopScene(scene);
			}
			if (scene.sceneType !== undefined && scene.currentDuration !== undefined && scene.currentDuration !== 0) {
				const campaignMedians: Map<SceneType, number[]> | undefined = this.medianTimes.get(scene.id.campaignId);
				if (campaignMedians !== undefined) {
					const sessionTypeTimes: number[]|undefined = campaignMedians.get(scene.sceneType);
					if (sessionTypeTimes !== undefined)
						sessionTypeTimes.push(scene.currentDuration);

				}
			}
		});
	}

	public getTypeExpectedDuration(
		campaignId: number,
		type: SceneType,
	): number {
		const previousDurations: number[] = this.medianTimes.get(campaignId)?.get(type) ?? [];

		if (previousDurations.length === 0) return 0;
		if (previousDurations.length === 1) return previousDurations[0];

		previousDurations.sort((left: number, right: number) => {
			if (left > right) return +1;
			if (left < right) return -1;
			return 0;
		});

		if (previousDurations.length % 2 === 0){
			const previous = previousDurations[previousDurations.length/2];
			const next = previousDurations[(previousDurations.length/2)-1];
			return Math.floor((previous+next)/2);
		} else {
			return previousDurations[(previousDurations.length-1)/2];
		}
	}
}
