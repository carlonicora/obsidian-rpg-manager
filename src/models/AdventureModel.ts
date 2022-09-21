import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {DataType} from "../enums/DataType";
import {SessionTableComponent} from "../components/SessionTableComponent";

export class AdventureModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addComponent(
			SessionTableComponent,
			this.database.readList<SessionInterface>(DataType.Session, this.currentElement.id)
				.sort(function (leftData: SessionInterface, rightData: SessionInterface) {
					if (leftData.sessionId > rightData.sessionId) return -1;
					if (leftData.sessionId < rightData.sessionId) return 1;
					return 0;
				}),
		);

		return this.response;
	}
}
