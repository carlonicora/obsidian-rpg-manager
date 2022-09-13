import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {SceneInterface} from "../interfaces/data/SceneInterface";

export class SceneNavigationModel extends AbstractModel {
	protected currentElement: SceneInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'Header',
				this.currentElement,
				null,
				this.sourceMeta,
			)
		);

		return response;
	}
}
