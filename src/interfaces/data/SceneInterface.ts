import {RecordInterface} from "../database/RecordInterface";
import {AdventureInterface} from "./AdventureInterface";
import {ActInterface} from "./ActInterface";
import {SessionInterface} from "./SessionInterface";

export interface SceneInterface extends RecordInterface {
	sceneId: number;
	sessionId: number|undefined;
	action: string|null;
	startTime: Date|null;
	endTime: Date|null;

	adventure: AdventureInterface;
	session: SessionInterface|undefined;
	act: ActInterface;
	previousScene: SceneInterface|null;
	nextScene: SceneInterface|null;

	get duration(): string;
}
