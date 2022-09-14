import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {DataType} from "../enums/DataType";
import {ResponseData} from "../data/responses/ResponseData";
import {ClueInterface} from "../interfaces/data/ClueInterface";

export class ClueModel extends AbstractModel {
	protected currentElement: ClueInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'Header',
				this.currentElement
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'CharacterTable',
				this.currentElement.getRelationships(DataType.Character || DataType.NonPlayerCharacter),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'LocationTable',
				this.currentElement.getRelationships(DataType.Location),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'EventTable',
				this.currentElement.getRelationships(DataType.Event),
			)
		);

		return response;
	}
}
