import {ComponentDataMetadataInterface} from "./ComponentDataMetadataInterface";

export interface SessionDataMetadataInterface extends ComponentDataMetadataInterface {
	irl?: string | undefined;
	abtStage?: 'need' | 'and' | 'but' | 'therefore' | undefined;
}
