import {RpgDataInterface} from "./RpgDataInterface";
import {AdventureInterface} from "./AdventureInterface";
import {SessionInterface} from "./SessionInterface";

export interface SceneInterface extends RpgDataInterface {
	sceneId: number;
	action: string|null;
	startTime: Date|null;
	endTime: Date|null;

	adventure: AdventureInterface;
	session: SessionInterface;
	previousScene: SceneInterface|null;
	nextScene: SceneInterface|null;

	get duration(): string;
}
