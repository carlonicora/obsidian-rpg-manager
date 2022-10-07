import {ComponentInterface} from "../../interfaces/ComponentInterface";
import {PlotsInterface} from "../../../plots/interfaces/PlotsInterface";
import {SessionDataInterface} from "./data/SessionDataInterface";

export interface SessionInterface extends ComponentInterface, PlotsInterface, SessionDataInterface {
	get previousSession(): SessionInterface | null;
	get nextSession(): SessionInterface | null;
	get isSceneNoteListAvailable(): boolean;

	replaceSceneNoteList(
		content: Array<string>,
	): Promise<void>;
}
