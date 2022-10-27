import {DatabaseInterface} from "./DatabaseInterface";
import {Database} from "../Database";

export interface DatabaseManagerInterface {
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
}
