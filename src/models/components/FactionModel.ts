import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {ComponentInterface} from "../../interfaces/database/ComponentInterface";
import {HeaderSubModel} from "../subModels/HeaderSubModel";
import {RelationshipType} from "../../enums/RelationshipType";

export class FactionModel extends AbstractModel {
	protected currentElement: ComponentInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(HeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Character, RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(ComponentType.NonPlayerCharacter, RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Subplot, RelationshipType.Reverse|RelationshipType.ReverseInFrontmatter);

		return this.response;
	}
}
