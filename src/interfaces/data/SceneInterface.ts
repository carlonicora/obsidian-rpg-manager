import {RecordInterface} from "../database/RecordInterface";
import {AdventureInterface} from "./AdventureInterface";
import {ActInterface} from "./ActInterface";

export interface SceneInterface extends RecordInterface {
	sceneId: number;
	action: string|null;
	startTime: Date|null;
	endTime: Date|null;

	adventure: AdventureInterface;
	act: ActInterface;
	previousScene: SceneInterface|null;
	nextScene: SceneInterface|null;

	get duration(): string;
}
