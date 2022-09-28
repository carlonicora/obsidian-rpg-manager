import {ComponentInterface} from "../database/ComponentInterface";
import {AdventureInterface} from "./AdventureInterface";
import {ActInterface} from "./ActInterface";
import {SessionInterface} from "./SessionInterface";
import {StoryCircleStage} from "../../enums/StoryCircleStage";
import {SceneType} from "../../enums/SceneType";

export interface SceneInterface extends ComponentInterface {
	sceneId: number;
	sessionId: number|undefined;
	action: string|null;
	startTime: Date|null;
	endTime: Date|null;
	date: Date|null;

	storycircleStage: StoryCircleStage|undefined;
	sceneType: SceneType|undefined;
	isExciting: boolean|undefined;


	adventure: AdventureInterface;
	session: SessionInterface|undefined;
	act: ActInterface;
	previousScene: SceneInterface|null;
	nextScene: SceneInterface|null;

	get duration(): string;

	get isSceneActive(): boolean;
	getSceneTime(): number;
	get isSceneExciting(): boolean
}
