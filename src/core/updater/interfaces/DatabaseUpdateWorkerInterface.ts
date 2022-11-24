import {DatabaseUpdaterReporterInterface} from "./DatabaseUpdaterReporterInterface";

export interface DatabaseUpdateWorkerInterface {
	get from(): string;
	get to(): string;

	run(
		reporter?: DatabaseUpdaterReporterInterface,
	): Promise<void>;
}
