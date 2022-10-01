import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {ActV2Interface} from "../../_dbV2/components/interfaces/ActV2Interface";
import {SceneV2Interface} from "../../_dbV2/components/interfaces/SceneV2Interface";

export class ActModel extends AbstractModel {
	protected currentElement: ActV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const data = this.database.readList<SceneV2Interface>(ComponentType.Scene, this.currentElement.id);

		await this.addList(ComponentType.Scene, data);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Faction);

		return this.response;
	}
}
