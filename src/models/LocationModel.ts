import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {LocationInterface} from "../interfaces/data/LocationInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {EventTableComponent} from "../components/EventTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class LocationModel extends AbstractModel {
	protected currentElement: LocationInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(RecordType.Character | RecordType.NonPlayerCharacter),
		);

		await this.response.addComponent(
			EventTableComponent,
			this.currentElement.getRelationships(RecordType.Event, RelationshipType.Reverse),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(RecordType.Clue),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(RecordType.Location, RelationshipType.DirectInFrontmatter),
			'Location contained',
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(RecordType.Location, RelationshipType.ReverseInFrontmatter),
			'Part of locations',
		);

		return this.response;
	}
}
