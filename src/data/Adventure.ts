import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {RecordType} from "../enums/RecordType";
import {FrontMatterCache} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";

export class Adventure extends AbstractOutlineRecord implements AdventureInterface {
	public adventureId: number;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		const adventureId = this.id.adventureId;
		if (adventureId === undefined) throw new TagMisconfiguredError(this.app, this.id);

		this.adventureId = adventureId;

		super.initialiseData(frontmatter);
	}
}
