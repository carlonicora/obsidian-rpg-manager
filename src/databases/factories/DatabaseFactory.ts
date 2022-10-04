import {DatabaseFactoryInterface} from "./interfaces/DatabaseFactoryInterface";
import {AbstractFactory} from "../../abstracts/AbstractFactory";
import {Database} from "../Database";
import {DatabaseInterface} from "../interfaces/DatabaseInterface";

export class DatabaseFactory extends AbstractFactory implements DatabaseFactoryInterface {
	public create(
	): DatabaseInterface {
		return new Database(this.app);
	}
}
