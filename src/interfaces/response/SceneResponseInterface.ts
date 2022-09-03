import {ResponseElementInterface} from "./ResponseElementInterface";

export interface SceneResponseInterface extends ResponseElementInterface {
	goals: string|null;
	actions: string|null;
}
