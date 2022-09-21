import {DatabaseInterface} from "../database/DatabaseInterface";

export interface DatabaseFactoryInterface {
	create(
	): DatabaseInterface;
}
