import {GenericDataInterface} from "./GenericDataInterface";
import {GenericImageDataInterface} from "./GenericImageDataInterface";
import {Pronoun} from "../../enums/Pronoun";

export interface CharacterDataInterface extends GenericDataInterface, GenericImageDataInterface {
	age: string;
	isDead: boolean;
	synopsis: string;
	goals: string|null;
	pronoun: Pronoun|null;
}
