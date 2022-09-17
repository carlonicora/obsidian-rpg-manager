import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";
import {EventInterface} from "../interfaces/data/EventInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";

export class EventModel extends AbstractModel {
	protected currentElement: EventInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(DataType.Character | DataType.NonPlayerCharacter),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(DataType.Clue, false),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location, false),
		);

		return this.response;
	}
}
