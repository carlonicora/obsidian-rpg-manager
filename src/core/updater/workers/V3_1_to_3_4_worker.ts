import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {DatabaseUpdaterReporterInterface} from "../interfaces/DatabaseUpdaterReporterInterface";
import {TFile} from "obsidian";
import {ComponentType} from "../../enums/ComponentType";

export class V3_1_to_3_4_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	private _elements: Map<TFile, {type?: ComponentType, campaign?: number, parent?: number}>;
	private _files: TFile[];

	public async run(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<void> {
		/*
		this._elements = new Map<TFile, {type: ComponentType; campaign?: number; parent?: number}>();
		this.api.service(LoggerService).warning(LogMessageType.Updater, 'Updating RPG Manager from v3.1 to v3.4');

		await this._loadElements();

		if (reporter !== undefined) {
			reporter.refreshFileCount();
			reporter.setFileCount(this._elements.size);
		}

		for (let filesIndex=0; filesIndex<this._files.length; filesIndex++) {
			const file: TFile = this._files[filesIndex];
			const elementInformation = this._elements.get(file);

			if (elementInformation === undefined){
				reporter?.addFileUpdated();
				continue;
			}


		}
		 */
	}

	private async _loadElements(
	): Promise<void> {
		/*
		this._files = await this.api.app.vault.getMarkdownFiles();

		for (let filesIndex=0; filesIndex<this._files.length; filesIndex++) {
			const file: TFile = this._files[filesIndex];
			const cachedMetadata: CachedMetadata | null = this.api.app.metadataCache.getFileCache(file);
			if (cachedMetadata == null || cachedMetadata.sections == null) {
				this._elements.set(file, {});
				continue;
			}

			for (let index=0; index<(cachedMetadata.sections.length ?? 0); index++){
				const section: SectionCache = cachedMetadata.sections[index];
				if (section.type === 'code')
			}

			//check RpgManagerId codeblock
			//read the codeblock and add it to _elements
		}
		 */
	}
}
