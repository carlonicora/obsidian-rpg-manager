import {ComponentDataMetadataInterface} from "../../../interfaces/ComponentDataMetadataInterface";

export interface CampaignDataMetadataInterface extends ComponentDataMetadataInterface {
	date?: string|undefined;
	currentAdventureId?: string|undefined;
	currentActId?: string|undefined;
	currentSessionId?: string|undefined;
}
