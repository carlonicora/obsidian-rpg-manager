import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SceneV2Interface} from "../../_dbV2/components/interfaces/SceneV2Interface";

export class SceneModel extends AbstractModel {
	protected currentElement: SceneV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {

		await this.addRelationships(ComponentType.Music);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Faction);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Event);

		return this.response;
	}
}
