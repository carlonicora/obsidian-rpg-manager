import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";
import {LocationInterface} from "../interfaces/data/LocationInterface";

export class LocationModel extends AbstractModel {
	protected currentElement: LocationInterface;

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
				'EventTable',
				this.currentElement.getRelationships(DataType.Event),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'ClueTable',
				this.currentElement.getRelationships(DataType.Clue),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'LocationTable',
				this.currentElement.getRelationships(DataType.Location),
				'Contained locations',
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'LocationTable',
				this.currentElement.getRelationships(DataType.Location),
				'Part of locations',
			)
		);

		return response;
	}
}
