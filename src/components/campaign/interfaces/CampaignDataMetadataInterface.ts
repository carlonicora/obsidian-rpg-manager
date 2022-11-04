import {ComponentDataMetadataInterface} from "../../../core/interfaces/ComponentDataMetadataInterface";

export interface CampaignDataMetadataInterface extends ComponentDataMetadataInterface {
	date?: string;
	currentAdventureId?: string;
	currentActId?: string;
	currentSessionId?: string;
	calendar?: string;
}
