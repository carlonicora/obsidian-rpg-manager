import {SceneType} from "../enums/SceneType";

export interface AnalyserDataImportInterface {
	currentDuration?: number|undefined,
	isExciting: boolean,
	isActive: boolean,
	expectedDuration: number,
	type?: SceneType|undefined,
}
