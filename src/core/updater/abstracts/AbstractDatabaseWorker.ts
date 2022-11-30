import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export abstract class AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	constructor(
		protected api: RpgManagerApiInterface,
	) {
	}

	public abstract get from(): string;

	public abstract get to(): string;

	public abstract run(
	): Promise<void>;
}
