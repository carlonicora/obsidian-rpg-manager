import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class FactionModel extends AbstractModel {
	protected currentElement: RecordInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement, this.currentElement);

		await this.addRelationships(RecordType.Character, RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(RecordType.NonPlayerCharacter, RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(RecordType.Location);
		await this.addRelationships(RecordType.Subplot, RelationshipType.Reverse|RelationshipType.ReverseInFrontmatter);

		return this.response;
	}
}
