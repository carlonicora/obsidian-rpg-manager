import {FileManipulatorInterface} from "./interfaces/FileManipulatorInterface";
import {App, CachedMetadata, TFile} from "obsidian";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RunningTimeService} from "../runningTimeService/RunningTimeService";

export class FileManipulator implements FileManipulatorInterface {
	private _fileContent: string;
	public cachedFile: CachedMetadata;

	constructor(
		private _app: App,
		private _api: RpgManagerApiInterface,
		private _file: TFile,
		fileContent?: string,
	) {
		if (fileContent !== undefined)
			this._fileContent = fileContent;

	}

	get content(): string {
		return this._fileContent;
	}

	get contentArray(): string[] {
		return this._fileContent.split('\n');
	}

	public async maybeWrite(
		content: string,
	): Promise<boolean> {
		if (content === this._fileContent)
			return true;

		return this._app.vault.modify(this._file, content)
			.then(() => {
				return this._api.database.onSave(this._file)
					.then(() => {
						const model = this._api.database.readByPath(this._file.path);
						if (model !== undefined) {
							model.touch();

							if (model.id.type === ComponentType.Scene)
								this._api.service(RunningTimeService).updateMedianTimes();
						}

						this._app.workspace.trigger("rpgmanager:force-refresh-views");
						return true;
					});
			});
	}

	public async read(
	): Promise<boolean> {
		const cache: CachedMetadata|null = await this._app.metadataCache.getFileCache(this._file);

		if (cache === null)
			return false;

		this.cachedFile = cache;

		if (this._fileContent === undefined)
			this._fileContent = await this._app.vault.read(this._file);

		return true;
	}
}
