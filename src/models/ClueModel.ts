import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";
import {EventTableComponent} from "../components/EventTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";

export class ClueModel extends AbstractModel {
	protected currentElement: ClueInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(RecordType.Character | RecordType.NonPlayerCharacter),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(RecordType.Location),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(RecordType.Clue),
		);

		await this.response.addComponent(
			EventTableComponent,
			this.currentElement.getRelationships(RecordType.Event),
		);

		return this.response;
	}
}
