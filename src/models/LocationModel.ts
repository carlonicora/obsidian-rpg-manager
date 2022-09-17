import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";
import {LocationInterface} from "../interfaces/data/LocationInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {EventTableComponent} from "../components/EventTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";

export class LocationModel extends AbstractModel {
	protected currentElement: LocationInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(DataType.Character | DataType.NonPlayerCharacter, true),
		);

		await this.response.addComponent(
			EventTableComponent,
			this.currentElement.getRelationships(DataType.Event, true),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(DataType.Clue, true),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location, false),
			'Contained locations',
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location, true),
			'Part of locations',
		);

		return this.response;
	}
}
