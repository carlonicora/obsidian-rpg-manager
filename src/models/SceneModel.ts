import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {SceneInterface} from "../interfaces/data/SceneInterface";

export class SceneModel extends AbstractModel {
	protected currentElement: SceneInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {

		await this.addRelationships(RecordType.Music);
		await this.addRelationships(RecordType.Character);
		await this.addRelationships(RecordType.NonPlayerCharacter);
		await this.addRelationships(RecordType.Faction);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Location);
		await this.addRelationships(RecordType.Event);

		return this.response;
	}
}
