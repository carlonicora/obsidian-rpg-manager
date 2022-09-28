import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {EventInterface} from "../../interfaces/components/EventInterface";
import {RelationshipType} from "../../enums/RelationshipType";
import {EventHeaderSubModel} from "../subModels/headers/EventHeaderSubModel";

export class EventModel extends AbstractModel {
	protected currentElement: EventInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(EventHeaderSubModel, this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Subplot, RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location);

		return this.response;
	}
}
