import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../../enums/ComponentType";
import {CharacterHeaderSubModel} from "../subModels/headers/CharacterHeaderSubModel";
import {CharacterV2Interface} from "../../_dbV2/components/interfaces/CharacterV2Interface";

export class PcModel extends AbstractModel {
	protected currentElement: CharacterV2Interface;

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
