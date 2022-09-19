import {DatabaseUpdateWorkerInterface} from "../../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../../abstracts/AbstractDatabaseWorker";

export class V1_2_to_1_3_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
	): Promise<void> {
		console.log('updating version 1.2 to 1.3');
		return;
	}
}
