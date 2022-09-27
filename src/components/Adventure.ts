import {AbstractComponentOutline} from "../abstracts/AbstractComponentOutline";
import {AdventureInterface} from "../interfaces/components/AdventureInterface";
import {FrontMatterCache} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";

export class Adventure extends AbstractComponentOutline implements AdventureInterface {
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
