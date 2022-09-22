import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {FactionTableComponent} from "../components/FactionTableComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";

export class PcModel extends AbstractModel {
	protected currentElement: CharacterInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent,this.currentElement);

		await this.response.addComponent(
			FactionTableComponent,
			this.currentElement.getRelationships(RecordType.Faction),
		);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(RecordType.Character | RecordType.NonPlayerCharacter),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(RecordType.Location),
		);

		return this.response;
	}
}
