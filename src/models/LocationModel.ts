import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {DataType} from "../enums/DataType";
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
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(DataType.Character | DataType.NonPlayerCharacter),
		);

		await this.response.addComponent(
			EventTableComponent,
			this.currentElement.getRelationships(DataType.Event, RelationshipType.Reverse),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(DataType.Clue),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location, RelationshipType.DirectInFrontmatter),
			'Location contained',
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location, RelationshipType.ReverseInFrontmatter),
			'Part of locations',
		);

		return this.response;
	}
}
