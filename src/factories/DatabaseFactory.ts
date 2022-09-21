import {AbstractFactory} from "../abstracts/AbstractFactory";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {Database} from "../database/Database";

export class DatabaseFactory extends AbstractFactory {
	public create(
	): DatabaseInterface {
		return new Database(this.app);
	}
}
