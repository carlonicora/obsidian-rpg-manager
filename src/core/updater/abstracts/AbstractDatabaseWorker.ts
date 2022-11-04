import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export abstract class AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	constructor(
		protected api: RpgManagerApiInterface,
	) {
	}

	public abstract run(
	): Promise<void>;
}
