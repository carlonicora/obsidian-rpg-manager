import {ComponentInterface} from "../../interfaces/ComponentInterface";
import {AdventureInterface} from "./AdventureInterface";
import {ActInterface} from "./ActInterface";
import {SessionInterface} from "./SessionInterface";
import {SceneDataInterface} from "./data/SceneDataInterface";

export interface SceneInterface extends ComponentInterface, SceneDataInterface {
	get adventure(): AdventureInterface;
	get act(): ActInterface;
	get session(): SessionInterface|null;
	get previousScene(): SceneInterface|null;
	get nextScene(): SceneInterface|null;

	get currentDuration(): number;
	get duration(): string;
	get isActive(): boolean;
	get expectedDuration(): number;
	get isExciting(): boolean
	get isCurrentlyRunning(): boolean;
	get lastStart(): number;
}
