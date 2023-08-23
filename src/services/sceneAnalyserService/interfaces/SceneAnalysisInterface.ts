export interface SceneAnalysisInterface {
	get score(): number;
	get activity(): number;
	get excitement(): number;
	get interest(): number;
	get variety(): number;
	get duration(): number | undefined;
	get expectedDuration(): number;
	addExpectedDuration(duration: number): void;
	addExcitingDuration(duration: number): void;
	addActiveDuration(duration: number): void;
	addSceneType(sceneType: string): void;
	addDuplicatedSuccessiveSceenType(): void;
}
