import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {ActInterface} from "../../database/components/interfaces/ActInterface";
import {SceneInterface} from "../../database/components/interfaces/SceneInterface";

export class ActModel extends AbstractModel {
	protected currentElement: ActInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const data = this.database.readList<SceneInterface>(ComponentType.Scene, this.currentElement.id);

		await this.addList(ComponentType.Scene, data);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Faction);

		return this.response;
	}
}
