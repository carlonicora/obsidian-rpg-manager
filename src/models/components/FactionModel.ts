import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {FactionHeaderSubModel} from "../subModels/headers/FactionHeaderSubModel";
import {ComponentInterface} from "../../database/interfaces/ComponentInterface";
import {RelationshipType} from "../../database/relationships/enums/RelationshipType";

export class FactionModel extends AbstractModel {
	protected currentElement: ComponentInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(FactionHeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Character, RelationshipType.Reversed);
		await this.addRelationships(ComponentType.NonPlayerCharacter, RelationshipType.Reversed);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Subplot, RelationshipType.Reversed);

		return this.response;
	}
}
