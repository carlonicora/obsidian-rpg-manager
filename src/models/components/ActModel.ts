import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ActInterface} from "../../interfaces/components/ActInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SceneInterface} from "../../interfaces/components/SceneInterface";

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
