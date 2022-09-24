import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {RecordType} from "../enums/RecordType";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {SorterComparisonElement} from "../database/SorterComparisonElement";

export class ActModel extends AbstractModel {
	protected currentElement: ActInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const data = this.database.readList<SceneInterface>(
				RecordType.Scene,
				this.currentElement.id,
				undefined,
			).sort(
				this.factories.sorter.create<SceneInterface>([new SorterComparisonElement((scene: SceneInterface) => scene.sceneId)])
			);

		await this.addList(RecordType.Scene, data);
		await this.addRelationships(RecordType.Character);
		await this.addRelationships(RecordType.NonPlayerCharacter);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Location);
		await this.addRelationships(RecordType.Faction);

		return this.response;
	}
}
