import {DatabaseFactoryInterface} from "./interfaces/DatabaseFactoryInterface";
import {Database} from "../Database";
import {DatabaseInterface} from "../interfaces/DatabaseInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class DatabaseFactory implements DatabaseFactoryInterface {
	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public create(
	): DatabaseInterface {
		return new Database(this._api);
	}
}
