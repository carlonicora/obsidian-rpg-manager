import {AdventureDataInterface} from "./AdventureDataInterface";
import {CampaignDataInterface} from "./CampaignDataInterface";
import {GenericDataInterface} from "./GenericDataInterface";
import {SessionDataInterface} from "./SessionDataInterface";
import {GenericImageDataInterface} from "./GenericImageDataInterface";

export interface SceneDataInterface extends GenericDataInterface, GenericImageDataInterface {
	synopsis: string;
	action: string;
	sessionId: number;
	adventureId: number;
	id: number;
	startTime: string;
	endTime: string;
	duration: string;
	session: SessionDataInterface|null;
	adventure: AdventureDataInterface|null;
	previousScene: SceneDataInterface|null;
	nextScene: SceneDataInterface|null;
	campaign: CampaignDataInterface|null;
}
