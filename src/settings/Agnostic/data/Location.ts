import {AbstractRpgElementData} from "../../../abstracts/AbstractRpgElementData";
import {LocationInterface} from "../../../interfaces/data/LocationInterface";
import {CachedMetadata, TFile} from "obsidian";

export class Location extends AbstractRpgElementData implements LocationInterface {
	public address: string|null;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.address = this.frontmatter?.address;
	}
}
