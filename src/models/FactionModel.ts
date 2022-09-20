import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {DataType} from "../enums/DataType";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";
import {RelationshipType} from "../enums/RelationshipType";

export class FactionModel extends AbstractModel {
	protected currentElement: RecordInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(DataType.Character|DataType.NonPlayerCharacter, RelationshipType.All),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location),
		);

		return this.response;
	}
}
