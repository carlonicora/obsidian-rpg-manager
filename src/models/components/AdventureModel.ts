import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {AdventureInterface} from "../../database/components/interfaces/AdventureInterface";
import {ActInterface} from "../../database/components/interfaces/ActInterface";

export class AdventureModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.addList(
			ComponentType.Act,
			this.database.readList<ActInterface>(ComponentType.Act, this.currentElement.id)
				.sort(
					this.factories.sorter.create<ActInterface>([new SorterComparisonElement((act: ActInterface) => act.id.actId)])
				),
		);

		return this.response;
	}
}
