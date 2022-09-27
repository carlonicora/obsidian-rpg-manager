import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {LocationInterface} from "../../interfaces/components/LocationInterface";
import {HeaderSubModel} from "../subModels/HeaderSubModel";
import {RelationshipType} from "../../enums/RelationshipType";

export class LocationModel extends AbstractModel {
	protected currentElement: LocationInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(HeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Character, RelationshipType.Direct | RelationshipType.DirectInFrontmatter | RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(ComponentType.NonPlayerCharacter, RelationshipType.Direct | RelationshipType.DirectInFrontmatter | RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(ComponentType.Event, RelationshipType.Reverse);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location, RelationshipType.DirectInFrontmatter, 'Contains');
		await this.addRelationships(ComponentType.Location, RelationshipType.ReverseInFrontmatter, 'Inside');

		return this.response;
	}
}
