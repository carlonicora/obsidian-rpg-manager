import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {LogMessageType} from "../../../loggers/enums/LogMessageType";

export class V2_0_to_2_1_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(): Promise<void> {
		this.factories.logger.warning(LogMessageType.Updater, 'Updating RPG Manager from v2.0 to v2.1');
	}
}
