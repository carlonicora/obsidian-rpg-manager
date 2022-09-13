import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";

export class NpcModel extends AbstractModel {
	protected currentElement: CharacterInterface;

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
				'FactionTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Faction,
				),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'CharacterTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Character,
				),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'EventTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Event,
					DataType.Character,
				),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'ClueTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Clue,
					DataType.Character,
				),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'LocationTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Location,
				),
			)
		);

		return response;
	}
}
