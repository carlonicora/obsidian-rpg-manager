import {AbstractModel} from "../abstracts/AbstractModel";
import {MusicInterface} from "../interfaces/data/MusicInterface";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicInterface;

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
				'MusicTable',
				this.currentElement.getRelationships(DataType.Music, false),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'SceneTable',
				this.currentElement.getRelationships(DataType.Scene, true),
			)
		);

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'SessionTable',
				this.currentElement.getRelationships(DataType.Session, true),
			)
		);

		return response;
	}
}
