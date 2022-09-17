import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {DataType} from "../enums/DataType";
import {ResponseData} from "../data/responses/ResponseData";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";
import {EventTableComponent} from "../components/EventTableComponent";

export class ClueModel extends AbstractModel {
	protected currentElement: ClueInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(DataType.Character | DataType.NonPlayerCharacter, false),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location, false),
		);

		await this.response.addComponent(
			EventTableComponent,
			this.currentElement.getRelationships(DataType.Event, true),
		);

		return this.response;
	}
}
