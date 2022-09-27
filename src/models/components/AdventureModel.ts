import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {AdventureInterface} from "../../interfaces/components/AdventureInterface";
import {ActInterface} from "../../interfaces/components/ActInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";

export class AdventureModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.addList(
			ComponentType.Act,
			this.database.readList<ActInterface>(ComponentType.Act, this.currentElement.id)
				.sort(
					this.factories.sorter.create<ActInterface>([new SorterComparisonElement((act: ActInterface) => act.actId)])
				),
		);

		return this.response;
	}
}
