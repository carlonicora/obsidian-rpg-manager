import {ComponentDataMetadataInterface} from "../../../interfaces/ComponentDataMetadataInterface";

export interface SceneDataMetadataInterface extends ComponentDataMetadataInterface {
	sessionId?: number | undefined;
	action?: string | undefined;
	trigger?: string | undefined;
	date?: string | undefined;
	sceneType?: 'action' | 'combat' | 'encounter' | 'exposition' | 'investigation' | 'planning' | 'preparation' | 'recap' | 'socialcombat' | string | undefined;
	isActedUpon?: boolean | undefined;
	duration?: number | undefined;
	durations?: string[] | undefined;
	storyCircleStage?: 'you' | 'need' | 'go' | 'search' | 'find' | 'take' | 'return' | 'change' | string | undefined;
}
