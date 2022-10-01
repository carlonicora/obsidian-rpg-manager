import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {CharacterHeaderSubModel} from "../subModels/headers/CharacterHeaderSubModel";
import {CharacterV2Interface} from "../../_dbV2/components/interfaces/CharacterV2Interface";
import {RelationshipV2Type} from "../../_dbV2/relationships/enums/RelationshipV2Type";

export class NpcModel extends AbstractModel {
	protected currentElement: CharacterV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(CharacterHeaderSubModel,this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Subplot, RelationshipV2Type.Reversed);
		await this.addRelationships(ComponentType.Faction);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Event, RelationshipV2Type.Reversed);
		await this.addRelationships(ComponentType.Clue, RelationshipV2Type.Reversed);
		await this.addRelationships(ComponentType.Location);

		return this.response;
	}
}
