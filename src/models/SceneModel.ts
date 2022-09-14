import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";
import {SceneInterface} from "../interfaces/data/SceneInterface";

export class SceneModel extends AbstractModel {
	protected currentElement: SceneInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'MusicTable',
				this.currentElement.getRelationships(DataType.Music),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'CharacterTable',
				this.currentElement.getRelationships(DataType.Character),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'FactionTable',
				this.currentElement.getRelationships(DataType.Faction),
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
			)
		);

		return response;
	}
}
