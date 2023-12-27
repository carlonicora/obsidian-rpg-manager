import { App, CachedMetadata, FrontmatterLinkCache, LinkCache, TFile } from "obsidian";
import { RelationshipLocation } from "src/enums/RelationshipLocation";
import { Service } from "src/interfaces/Service";

export type FileRelationship = {
	path: string;
	location: RelationshipLocation.Frontmatter | RelationshipLocation.Content;
};

export class FileRelationshipService implements Service {
	private _metadata: CachedMetadata | null = null;
	constructor(private _app: App, private _file: TFile) {}

	async initialise(): Promise<void> {
		this._metadata = this._app.metadataCache.getFileCache(this._file);
	}

	private _getLinkedFile(link: string): string | null {
		const file: TFile | null = this._app.metadataCache.getFirstLinkpathDest(link, "");
		if (!file) return null;

		return file.path;
	}

	getFrontmatterAndContentRelationships(): FileRelationship[] {
		const response: FileRelationship[] = [];

		if (!this._metadata) return response;

		this._metadata.frontmatterLinks?.forEach((link: FrontmatterLinkCache) => {
			const linkedPath = this._getLinkedFile(link.link);
			if (!linkedPath) return;

			response.push({ path: linkedPath, location: RelationshipLocation.Frontmatter });
		});

		this._metadata.links?.forEach((link: LinkCache) => {
			const linkedPath = this._getLinkedFile(link.link);
			if (!linkedPath) return;

			if (link.displayText !== null && link.displayText !== "") {
				response.push({ path: linkedPath, location: RelationshipLocation.Content });
			}
		});

		return response;
	}

	// getHiddenRelationships(): FileRelationship[] {
	// 	const response: FileRelationship[] = [];

	// 	if (!this._metadata) return response;

	// 	this._metadata.links?.forEach((link: LinkCache) => {
	// 		const linkedPath = this._getLinkedFile(link.link);
	// 		if (!linkedPath) return;

	// 		if (link.displayText === null || link.displayText === "") {
	// 			response.push({ path: linkedPath, location: RelationshipLocation.Content });
	// 		}
	// 	});

	// 	return response;
	// }
}
