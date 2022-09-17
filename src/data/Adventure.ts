import {AbstractOutlineRecord} from "../abstracts/database/AbstractOutlineRecord";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";

export class Adventure extends AbstractOutlineRecord implements AdventureInterface {
	public adventureId: number;

	protected initialiseData(
	): void {
		this.adventureId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);

		super.initialiseData();
	}
}
