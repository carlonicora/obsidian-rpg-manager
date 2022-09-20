import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {DataType} from "../enums/DataType";
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
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(DataType.Character | DataType.NonPlayerCharacter),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(DataType.Clue),
		);

		await this.response.addComponent(
			EventTableComponent,
			this.currentElement.getRelationships(DataType.Event),
		);

		return this.response;
	}
}
