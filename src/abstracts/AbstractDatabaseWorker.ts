import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {App} from "obsidian";

export abstract class AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public constructor(
		protected app: App,
	) {
	}

	public abstract run(
	): Promise<void>;
}
