import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class ClueModel extends AbstractModel {
	protected currentElement: ClueInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement, this.currentElement);

		await this.addRelationships(RecordType.Subplot, RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(RecordType.Character);
		await this.addRelationships(RecordType.NonPlayerCharacter);
		await this.addRelationships(RecordType.Location);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Event);

		return this.response;
	}
}
