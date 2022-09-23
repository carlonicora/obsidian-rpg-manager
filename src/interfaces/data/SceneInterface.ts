import {RecordInterface} from "../database/RecordInterface";
import {AdventureInterface} from "./AdventureInterface";
import {ActInterface} from "./ActInterface";
import {SessionInterface} from "./SessionInterface";
import {StoryCircleStage} from "../../enums/StoryCircleStage";

export interface SceneInterface extends RecordInterface {
	sceneId: number;
	sessionId: number|undefined;
	action: string|null;
	startTime: Date|null;
	endTime: Date|null;
	storycircleStage: StoryCircleStage|undefined;
	date: Date|null;

	adventure: AdventureInterface;
	session: SessionInterface|undefined;
	act: ActInterface;
	previousScene: SceneInterface|null;
	nextScene: SceneInterface|null;

	get duration(): string;
}
