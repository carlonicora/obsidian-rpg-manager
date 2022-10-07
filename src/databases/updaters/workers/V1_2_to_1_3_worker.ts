import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {DatabaseUpdaterReporterInterface} from "../interfaces/DatabaseUpdaterReporterInterface";

export class V1_2_to_1_3_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<void> {
		return;
	}
}
