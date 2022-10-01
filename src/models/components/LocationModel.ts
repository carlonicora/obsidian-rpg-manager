import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {LocationHeaderSubModel} from "../subModels/headers/LocationHeaderSubModel";
import {LocationV2Interface} from "../../_dbV2/components/interfaces/LocationV2Interface";
import {RelationshipV2Type} from "../../_dbV2/relationships/enums/RelationshipV2Type";

export class LocationModel extends AbstractModel {
	protected currentElement: LocationV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(LocationHeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Character,);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Event, RelationshipV2Type.Reversed);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location, RelationshipV2Type.Child, 'Contains');
		await this.addRelationships(ComponentType.Location, RelationshipV2Type.Parent, 'Inside');

		return this.response;
	}
}
