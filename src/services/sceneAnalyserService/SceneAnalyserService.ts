import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AbtStage } from "src/data/enums/AbtStage";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementType } from "src/data/enums/ElementType";
import { SceneType, isSceneActive } from "src/data/enums/SceneType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { SceneAnalysis } from "./SceneAnalysis";
import { SceneAnalysisInterface } from "./interfaces/SceneAnalysisInterface";

export class SceneAnalyserService {
	private _defaultDuration: Map<SceneType, number> = new Map<SceneType, number>([
		[SceneType.Action, 15 * 60],
		[SceneType.Combat, 15 * 60],
		[SceneType.Encounter, 15 * 60],
		[SceneType.Exposition, 5 * 60],
		[SceneType.Investigation, 15 * 60],
		[SceneType.Decision, 10 * 60],
		[SceneType.Preparation, 10 * 60],
		[SceneType.Recap, 5 * 60],
		[SceneType.SocialCombat, 15 * 60],
	]);

	constructor(private _api: RpgManagerInterface) {}

	analyseSession(session: ElementInterface): SceneAnalysisInterface | undefined {
		const scenes: ElementInterface[] = this._api.get(
			undefined,
			session.campaign,
			ElementType.Scene
		) as ElementInterface[];

		if (scenes.length === 0) return undefined;

		scenes.sort((a, b) => b.positionInParent - a.positionInParent);

		const medianDurations: Map<SceneType, number> = this._analyseMedianDuration(session.campaign);

		const response: SceneAnalysisInterface = new SceneAnalysis(
			session.attribute(AttributeType.AbtStage)?.value as AbtStage | undefined,
			session.attribute("expected")?.value as number | undefined
		);

		let previousSceneType: SceneType | undefined = undefined;

		for (let i = 0; i < scenes.length; i++) {
			const scene: ElementInterface = scenes[i];

			const sceneType: SceneType | undefined = scene.attribute(AttributeType.SceneType).value as SceneType | undefined;
			if (sceneType === undefined) continue;

			let duration: number | undefined = medianDurations.get(sceneType);
			if (duration === undefined) duration = this._defaultDuration.get(sceneType);

			// const duration: number | undefined = scene.attribute("duration").value as number | undefined;
			// if (sceneType === undefined || duration == undefined) return;

			const isExciting: boolean = scene.attribute(AttributeType.ExternalActions)?.value ?? (false as boolean);
			const isActive: boolean = isSceneActive(sceneType);

			response.addSceneType(sceneType);
			response.addExpectedDuration(duration);

			if (previousSceneType === sceneType) response.addDuplicatedSuccessiveSceenType();

			if (isExciting) response.addExcitingDuration(duration);
			if (isActive) response.addActiveDuration(duration);

			previousSceneType = sceneType;
		}

		return response;
	}

	private _analyseMedianDuration(campaing: ElementInterface): Map<SceneType, number> {
		const allScenes: ElementInterface[] = this._api.get(undefined, campaing, ElementType.Scene) as ElementInterface[];

		const durations: Map<SceneType, number[]> = new Map<SceneType, number[]>();

		allScenes.forEach((scene: ElementInterface) => {
			const sceneType: SceneType | undefined = scene.attribute(AttributeType.SceneType)?.value as SceneType | undefined;
			const duration: number | undefined = scene.attribute(AttributeType.Duration)?.value as number | undefined;

			if (sceneType === undefined || duration == undefined) return;

			if (durations.has(sceneType)) {
				durations.get(sceneType)?.push(duration);
			} else {
				durations.set(sceneType, [duration]);
			}
		});

		const medianDurations: Map<SceneType, number> = new Map<SceneType, number>();

		durations.forEach((durationArray: number[], sceneType: SceneType) => {
			const sortedArray: number[] = durationArray.sort((a, b) => a - b);

			const medianIndex: number = Math.floor(sortedArray.length / 2);

			medianDurations.set(sceneType, sortedArray[medianIndex]);
		});

		return medianDurations;
	}

	getExpectedDuration(campaign: ElementInterface, sceneType: SceneType | undefined): number {
		if (sceneType === undefined) return 0;

		const allScenes: ElementInterface[] = (
			this._api.get(undefined, campaign, ElementType.Scene) as ElementInterface[]
		).filter((scene: ElementInterface) => scene.attribute(AttributeType.SceneType)?.value === sceneType);

		let response = 0;

		allScenes.forEach((scene: ElementInterface) => {
			response += scene.attribute(AttributeType.Duration)?.value ?? 0;
		});

		if (response === 0) return this._defaultDuration.get(sceneType) ?? 0;

		return response;
	}
}
