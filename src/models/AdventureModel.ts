import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {RecordType} from "../enums/RecordType";
import {SorterComparisonElement} from "../database/SorterComparisonElement";

export class AdventureModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.addList(
			RecordType.Act,
			this.database.readList<ActInterface>(RecordType.Act, this.currentElement.id)
				.sort(
					this.factories.sorter.create<ActInterface>([new SorterComparisonElement((act: ActInterface) => act.actId)])
				),
		);

		return this.response;
	}
}
