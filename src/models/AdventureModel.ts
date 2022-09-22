import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {RecordType} from "../enums/RecordType";

export class AdventureModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.addList(
			RecordType.Act,
			this.database.readList<ActInterface>(RecordType.Act, this.currentElement.id)
				.sort(function (leftData: ActInterface, rightData: ActInterface) {
					if (leftData.actId > rightData.actId) return -1;
					if (leftData.actId < rightData.actId) return 1;
					return 0;
				}),
		);

		return this.response;
	}
}
