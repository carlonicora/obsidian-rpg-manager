import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {EventInterface} from "../interfaces/data/EventInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";

export class EventModel extends AbstractModel {
	protected currentElement: EventInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(RecordType.Character | RecordType.NonPlayerCharacter),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(RecordType.Clue),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(RecordType.Location),
		);

		return this.response;
	}
}
