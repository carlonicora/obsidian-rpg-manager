import {DatabaseManagerInterface} from "./interfaces/DatabaseManagerInterface";
import {DatabaseInterface} from "./interfaces/DatabaseInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {Database} from "./Database";

export class DatabaseManager implements DatabaseManagerInterface {
	private _database: DatabaseInterface;

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	get database(): DatabaseInterface {
		if (this._database === undefined)
			this._database = new Database(this._api);

		return this._database;
	}
	set database(database: DatabaseInterface) {
		this._database = database;
	}
}
