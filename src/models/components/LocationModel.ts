import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {LocationHeaderSubModel} from "../subModels/headers/LocationHeaderSubModel";
import {LocationInterface} from "../../database/components/interfaces/LocationInterface";
import {RelationshipType} from "../../database/relationships/enums/RelationshipType";

export class LocationModel extends AbstractModel {
	protected currentElement: LocationInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(LocationHeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Character,);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Event, RelationshipType.Reversed);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location, RelationshipType.Child, 'Contains');
		await this.addRelationships(ComponentType.Location, RelationshipType.Parent, 'Inside');

		return this.response;
	}
}
