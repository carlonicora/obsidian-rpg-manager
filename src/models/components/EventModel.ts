import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {EventHeaderSubModel} from "../subModels/headers/EventHeaderSubModel";
import {EventInterface} from "../../database/components/interfaces/EventInterface";
import {RelationshipType} from "../../database/relationships/enums/RelationshipType";

export class EventModel extends AbstractModel {
	protected currentElement: EventInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(EventHeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Subplot, RelationshipType.Reversed);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location);

		return this.response;
	}
}
