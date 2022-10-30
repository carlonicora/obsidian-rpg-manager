import {ElementDataInterface} from "../../../../../managers/viewsManager/interfaces/ElementDataInterface";
import {SceneInterface} from "../../../../../components/scene/interfaces/SceneInterface";

export interface RunElementDataInterface extends ElementDataInterface {
	values: {
		isRunning: boolean,
		runtime?: number,
		scene: SceneInterface,
	}
}
