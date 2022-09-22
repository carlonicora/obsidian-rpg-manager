import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {RecordType} from "../enums/RecordType";

export class ActModel extends AbstractModel {
	protected currentElement: ActInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		/*
		if (!this.isExcluded(RecordType.Scene)) {
			await this.response.addComponent(
				SceneTableComponent,
				this.database.readList<SceneInterface>(
					RecordType.Scene,
					this.currentElement.id,
					undefined,
				).sort(function (leftData: SceneInterface, rightData: SceneInterface) {
					if (leftData.sceneId > rightData.sceneId) return +1;
					if (leftData.sceneId < rightData.sceneId) return -1;
					return 0;
				}),
			);
		}
		*/

		await this.addRelationships(
			RecordType.Scene,
			undefined,

		)

		await this.addRelationships(RecordType.Character);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Location);
		await this.addRelationships(RecordType.Faction);

		return this.response;
	}
}
