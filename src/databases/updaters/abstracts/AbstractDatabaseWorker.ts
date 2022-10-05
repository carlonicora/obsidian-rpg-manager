import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractRpgManager} from "../../../abstracts/AbstractRpgManager";

export abstract class AbstractDatabaseWorker extends AbstractRpgManager implements DatabaseUpdateWorkerInterface {
	public abstract run(
	): Promise<void>;
}
