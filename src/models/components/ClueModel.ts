import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {ClueHeaderSubModel} from "../subModels/headers/ClueHeaderSubModel";
import {ClueInterface} from "../../database/components/interfaces/ClueInterface";
import {RelationshipType} from "../../database/relationships/enums/RelationshipType";

export class ClueModel extends AbstractModel {
	protected currentElement: ClueInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(ClueHeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Subplot, RelationshipType.Reversed);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Event);

		return this.response;
	}
}
