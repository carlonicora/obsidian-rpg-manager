import {AdventureInterface} from "../AdventureInterface";
import {ActInterface} from "../ActInterface";
import {SessionInterface} from "../SessionInterface";

export interface CampaignDataInterface {
	get date(): Date|undefined;
	get currentAdventure(): AdventureInterface|undefined;
	get currentAct(): ActInterface|undefined;
	get currentSession(): SessionInterface|undefined;
}
