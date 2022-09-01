import {SceneDataInterface} from "./SceneDataInterface";
import {GenericDataListInterface} from "./GenericDataListInterface";

export interface SceneListInterface extends GenericDataListInterface {
	elements: SceneDataInterface[];
}
