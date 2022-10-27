import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SessionInterface} from "../../session/interfaces/SessionInterface";
import {SceneDataInterface} from "./SceneDataInterface";

export interface SceneInterface extends ModelInterface, SceneDataInterface {
	get adventure(): AdventureInterface;
	get act(): ActInterface;
	get session(): SessionInterface|undefined;
	get previousScene(): SceneInterface|null;
	get nextScene(): SceneInterface|null;

	get currentDuration(): number;
	get duration(): string;
	get isActive(): boolean;
	get expectedDuration(): number;
	get isCurrentlyRunning(): boolean;
	get lastStart(): number;
}
