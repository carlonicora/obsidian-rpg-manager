import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {DataType} from "../../../enums/DataType";
import {MusicInterface} from "../../../interfaces/data/MusicInterface";

export class MusicModel extends AbstractModel {
	protected currentElement: MusicInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'Header',
				this.currentElement
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'MusicTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Music,
				),
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'SceneTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Session,
					DataType.Music,
				),
			)
		);

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'SessionTable',
				this.app.plugins.getPlugin('rpg-manager').io.getRelationshipList(
					this.currentElement,
					DataType.Session,
					DataType.Music,
				),
			)
		);

		return response;
	}
}
