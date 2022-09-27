import {AbstractComponent} from "./AbstractComponent";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ComponentDuplicatedError} from "../errors/ComponentDuplicatedError";
import {ComponentNotFoundError} from "../errors/ComponentNotFoundError";

export abstract class AbstractComponentOutline extends AbstractComponent implements ComponentInterface{
	public isOutline = true;

	public checkDuplicates(
		database: DatabaseInterface,
	): void {
		try {
			const duplicate = database.readSingle(this.id.type, this.id);
			throw new ComponentDuplicatedError(this.app, this.id, [duplicate], this);
		} catch (e) {
			if (e instanceof ComponentNotFoundError === false) {
				throw e;
			}
		}
	}
}
