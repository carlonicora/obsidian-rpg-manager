import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {DataType} from "../enums/DataType";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {FactionTableComponent} from "../components/FactionTableComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";

export class PcModel extends AbstractModel {
	protected currentElement: CharacterInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent,this.currentElement);

		await this.response.addComponent(
			FactionTableComponent,
			this.currentElement.getRelationships(DataType.Faction, false),
		);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(DataType.Character | DataType.NonPlayerCharacter, false),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location, false),
		);

		return this.response;
	}
}
