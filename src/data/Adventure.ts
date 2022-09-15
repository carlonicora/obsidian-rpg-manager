import {AbstractOutlineData} from "../abstracts/database/AbstractOutlineData";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";

export class Adventure extends AbstractOutlineData implements AdventureInterface {
	public adventureId: number;

	protected loadData(
	): void {
		this.adventureId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);

		super.loadData();
	}
}
