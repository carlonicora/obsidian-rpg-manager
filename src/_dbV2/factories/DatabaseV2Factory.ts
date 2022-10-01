import {DatabaseV2FactoryInterface} from "./interfaces/DatabaseV2FactoryInterface";
import {AbstractFactory} from "../../abstracts/AbstractFactory";
import {DatabaseV2} from "../DatabaseV2";
import {DatabaseV2Interface} from "../interfaces/DatabaseV2Interface";

export class DatabaseV2Factory  extends AbstractFactory implements DatabaseV2FactoryInterface {
	public create(
	): DatabaseV2Interface {
		return new DatabaseV2(this.app);
	}
}
