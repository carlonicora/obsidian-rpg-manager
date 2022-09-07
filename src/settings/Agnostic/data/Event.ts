import {AbstractRpgElementData} from "../../../abstracts/AbstractRpgElementData";
import {EventInterface} from "../../../interfaces/data/EventInterface";
import {CachedMetadata, TFile} from "obsidian";

export class Event extends AbstractRpgElementData implements EventInterface {
	public date: Date|null;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.date = this.initialiseDate(this.frontmatter?.dates?.event);
	}
}
