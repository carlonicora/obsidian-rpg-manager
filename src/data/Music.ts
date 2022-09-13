import {CachedMetadata, TFile} from "obsidian";
import {AbstractRpgElementData} from "../abstracts/AbstractRpgElementData";
import {MusicInterface} from "../interfaces/data/MusicInterface";

export class Music extends AbstractRpgElementData implements MusicInterface {
	public url: string|undefined;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.url = this.frontmatter?.url;
	}
}
