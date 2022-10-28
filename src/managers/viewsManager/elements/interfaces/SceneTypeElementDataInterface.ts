import {ElementDataInterface} from "../../interfaces/ElementDataInterface";
import {SceneType} from "../../../../services/analyserService/enums/SceneType";

export interface SceneTypeElementDataInterface extends ElementDataInterface {
	values: SceneType|undefined;
}
