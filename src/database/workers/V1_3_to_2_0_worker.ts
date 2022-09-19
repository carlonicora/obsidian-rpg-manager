import {DatabaseUpdateWorkerInterface} from "../../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../../abstracts/AbstractDatabaseWorker";

export class V1_3_to_2_0_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
	): Promise<void> {
		return;
	}
}
