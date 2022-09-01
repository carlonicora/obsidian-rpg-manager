import {AdventureDataInterface} from "./AdventureDataInterface";
import {CampaignDataInterface} from "./CampaignDataInterface";
import {GenericDataInterface} from "./GenericDataInterface";

export interface SessionDataInterface extends GenericDataInterface {
	id: number;
	adventureId: number;
	synopsis: string;
	date: string;
	irl: string;
	previousSession: SessionDataInterface|null,
	nextSession: SessionDataInterface|null;
	adventure: AdventureDataInterface|null;
	campaign: CampaignDataInterface|null;
}
