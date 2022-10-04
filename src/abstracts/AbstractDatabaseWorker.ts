import {DatabaseUpdateWorkerInterface} from "../databases/updaters/interfaces/DatabaseUpdateWorkerInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";

export abstract class AbstractDatabaseWorker extends AbstractRpgManager implements DatabaseUpdateWorkerInterface {
	public abstract run(
	): Promise<void>;
}
