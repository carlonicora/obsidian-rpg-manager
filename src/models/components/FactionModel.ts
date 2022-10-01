import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {RelationshipType} from "../../enums/RelationshipType";
import {FactionHeaderSubModel} from "../subModels/headers/FactionHeaderSubModel";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";

export class FactionModel extends AbstractModel {
	protected currentElement: ComponentV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(FactionHeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Character, RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(ComponentType.NonPlayerCharacter, RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Subplot, RelationshipType.Reverse|RelationshipType.ReverseInFrontmatter);

		return this.response;
	}
}
