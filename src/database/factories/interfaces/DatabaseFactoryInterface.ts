import {DatabaseInterface} from "../../interfaces/DatabaseInterface";

export interface DatabaseFactoryInterface {
	create(
	): DatabaseInterface;
}
