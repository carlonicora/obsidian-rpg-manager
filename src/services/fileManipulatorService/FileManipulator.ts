import {FileManipulatorInterface} from "./interfaces/FileManipulatorInterface";
import {CachedMetadata, TFile} from "obsidian";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class FileManipulator implements FileManipulatorInterface {
	private _fileContent: string;
	public cachedFile: CachedMetadata;

	constructor(
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
		if (content !== this._fileContent)
			await this._api.app.vault.modify(this._file, content);

		return true;
	}

	public async read(
	): Promise<boolean> {
		const cache: CachedMetadata|null = await this._api.app.metadataCache.getFileCache(this._file);

		if (cache === null)
			return false;

		this.cachedFile = cache;

		if (this._fileContent === undefined)
			this._fileContent = await this._api.app.vault.read(this._file);

		return true;
	}
}
