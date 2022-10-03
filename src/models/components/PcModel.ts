import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {CharacterHeaderSubModel} from "../subModels/headers/CharacterHeaderSubModel";
import {CharacterInterface} from "../../database/components/interfaces/CharacterInterface";

export class PcModel extends AbstractModel {
	protected currentElement: CharacterInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(CharacterHeaderSubModel,this.currentElement, this.currentElement);

		await this.addRelationships(ComponentType.Faction);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Location);

		return this.response;
	}
}
