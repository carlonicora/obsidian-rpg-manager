import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {AdventureV2Interface} from "../../_dbV2/components/interfaces/AdventureV2Interface";
import {ActV2Interface} from "../../_dbV2/components/interfaces/ActV2Interface";

export class AdventureModel extends AbstractModel {
	protected currentElement: AdventureV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.addList(
			ComponentType.Act,
			this.database.readList<ActV2Interface>(ComponentType.Act, this.currentElement.id)
				.sort(
					this.factories.sorter.create<ActV2Interface>([new SorterComparisonElement((act: ActV2Interface) => act.id.actId)])
				),
		);

		return this.response;
	}
}
