import {DatabaseInterface} from "./DatabaseInterface";

export interface DatabaseManagerInterface {
	get database(): DatabaseInterface;
	set database(database: DatabaseInterface);
}
