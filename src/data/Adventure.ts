import {AbstractRpgOutlineData} from "../abstracts/AbstractRpgOutlineData";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";
import {DataType} from "../enums/DataType";

export class Adventure extends AbstractRpgOutlineData implements AdventureInterface {
	public adventureId: number;

	protected async loadData(
	): Promise<void> {
		this.adventureId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);

		super.loadData();
	}
}
