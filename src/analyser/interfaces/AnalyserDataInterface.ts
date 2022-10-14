import {SceneType} from "../../components/enums/SceneType";
import {AbtStage} from "../../plots/enums/AbtStage";

export interface AnalyserDataInterface {
	dataLength: number;
	totalRunningTime: number;
	totalActiveScenes: number;
	totalRepetitiveScenes: number;
	totalExpectedRunningTime: number;
	totalExpectedExcitmentDuration: number;
	totalTargetDuration: number;
	dataTypeUsed: Map<SceneType, number>;
	abtStage: AbtStage|undefined;

	get isValid(): boolean;
	set dataCount(count: number);

	addExpectedRunningTime(
		duration: number
	): void;

	addExpectedExcitmentDuration(
		duration: number,
	): void;

	addActiveScene(
	): void;

	addSceneType(
		type: SceneType|undefined,
	): void;
}
