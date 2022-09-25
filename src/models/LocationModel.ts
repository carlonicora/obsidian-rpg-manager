import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {LocationInterface} from "../interfaces/data/LocationInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class LocationModel extends AbstractModel {
	protected currentElement: LocationInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement, this.currentElement);

		await this.addRelationships(RecordType.Character, RelationshipType.Direct | RelationshipType.DirectInFrontmatter | RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(RecordType.NonPlayerCharacter, RelationshipType.Direct | RelationshipType.DirectInFrontmatter | RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(RecordType.Event, RelationshipType.Reverse);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Location, RelationshipType.DirectInFrontmatter, 'Contains');
		await this.addRelationships(RecordType.Location, RelationshipType.ReverseInFrontmatter, 'Inside');

		return this.response;
	}
}
