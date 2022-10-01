import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {ClueHeaderSubModel} from "../subModels/headers/ClueHeaderSubModel";
import {ClueV2Interface} from "../../_dbV2/components/interfaces/ClueV2Interface";
import {RelationshipV2Type} from "../../_dbV2/relationships/enums/RelationshipV2Type";

export class ClueModel extends AbstractModel {
	protected currentElement: ClueV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(ClueHeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Subplot, RelationshipV2Type.Reversed);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Event);

		return this.response;
	}
}
