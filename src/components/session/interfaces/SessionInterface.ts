import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {PlotsInterface} from "../../../services/plotsServices/interfaces/PlotsInterface";
import {SessionDataInterface} from "./SessionDataInterface";

export interface SessionInterface extends ModelInterface, PlotsInterface, SessionDataInterface {
	get previousSession(): SessionInterface | null;
	get nextSession(): SessionInterface | null;
	get isSceneNoteListAvailable(): boolean;

	replaceSceneNoteList(
		content: string[],
	): Promise<void>;
}
