import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class NpcModel extends AbstractModel {
	protected currentElement: CharacterInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent,this.currentElement);

		await this.addRelationships(RecordType.Faction);
		await this.addRelationships(RecordType.Character);
		await this.addRelationships(RecordType.NonPlayerCharacter);
		await this.addRelationships(RecordType.Event, RelationshipType.Reverse);
		await this.addRelationships(RecordType.Clue, RelationshipType.Reverse);
		await this.addRelationships(RecordType.Location);

		return this.response;
	}
}
