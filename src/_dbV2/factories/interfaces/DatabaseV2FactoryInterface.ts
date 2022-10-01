import {DatabaseV2Interface} from "../../interfaces/DatabaseV2Interface";

export interface DatabaseV2FactoryInterface {
	create(
	): DatabaseV2Interface;
}
