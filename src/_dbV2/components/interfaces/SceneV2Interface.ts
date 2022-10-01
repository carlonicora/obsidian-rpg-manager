import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";
import {StoryCircleStage} from "../../../enums/StoryCircleStage";
import {SceneType} from "../../../enums/SceneType";
import {AdventureV2Interface} from "./AdventureV2Interface";
import {ActV2Interface} from "./ActV2Interface";
import {SessionV2Interface} from "./SessionV2Interface";

export interface SceneV2Interface extends ComponentV2Interface {
	get action(): string|undefined;
	get date(): Date|undefined;
	get storycircleStage(): StoryCircleStage|undefined;
	get sceneType(): SceneType|undefined;
	get isActedUpon(): boolean|undefined;

	get adventure(): AdventureV2Interface;
	get act(): ActV2Interface;
	get session(): SessionV2Interface|null;
	get previousScene(): SceneV2Interface|null;
	get nextScene(): SceneV2Interface|null;

	get currentDuration(): number;
	get duration(): string;
	get isActive(): boolean;
	get expectedDuration(): number;
	get isExciting(): boolean
	get isCurrentlyRunning(): boolean;
	get lastStart(): number;
}
