import {DatabaseUpdaterReporterInterface} from "./DatabaseUpdaterReporterInterface";

export interface DatabaseUpdateWorkerInterface {
	run(
		reporter?: DatabaseUpdaterReporterInterface,
	): Promise<void>;
}
