import {DatabaseUpdateWorkerInterface} from "../../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../../abstracts/AbstractDatabaseWorker";

export class V1_3_to_2_0_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
	): Promise<void> {
		console.log('updating version 1.3 to 1.4');
		return;
	}
}
