import {ElementDataInterface} from "../../../../../managers/viewsManager/interfaces/ElementDataInterface";
import {SceneType} from "../../../enums/SceneType";

export interface SceneTypeElementDataInterface extends ElementDataInterface {
	values: SceneType|undefined;
}
