import {CharacterDataInterface} from "./CharacterDataInterface";
import {GenericDataListInterface} from "./GenericDataListInterface";

export interface CharacterListInterface extends GenericDataListInterface {
	elements: CharacterDataInterface[];
}
