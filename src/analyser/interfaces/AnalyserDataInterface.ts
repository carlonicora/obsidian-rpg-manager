import {SceneType} from "../../components/enums/SceneType";

export interface AnalyserDataInterface {
	dataLength: number;
	totalRunningTime: number;
	totalActiveScenes: number;
	totalRepetitiveScenes: number;
	totalExpectedRunningTime: number;
	totalExpectedExcitmentDuration: number;
	totalTargetDuration: number;
	dataTypeUsed: Map<SceneType, number>;

	get totalExcitementPercentage(): number;
	get totalActivityPercentage(): number;
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
