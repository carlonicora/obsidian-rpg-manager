import {ComponentDataMetadataInterface} from "../../../interfaces/ComponentDataMetadataInterface";

export interface SessionDataMetadataInterface extends ComponentDataMetadataInterface {
	irl?: string | undefined;
	abtStage?: 'need' | 'and' | 'but' | 'therefore' | undefined;
	targetDuration?: number;
}
