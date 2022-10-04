import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../../../abstracts/AbstractDatabaseWorker";
import {LogMessageType, WarningLog} from "../../../loggers/Logger";

export class V1_3_to_2_0_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(): Promise<void> {
		new WarningLog(LogMessageType.Updater, 'Updating RPG Manager from v1.3 to v2.0');

		//const files: TFile[] = await this.app.vault.getMarkdownFiles();

		//Get all the relationships and additional metadatas from the frontmatter and move them
	}
}
