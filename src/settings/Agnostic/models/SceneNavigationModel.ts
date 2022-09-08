import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ResponseBox} from "../../../data/responses/ResponseBox";
import {SceneInterface} from "../../../interfaces/data/SceneInterface";

export class SceneNavigationModel extends AbstractModel {
	protected currentElement: SceneInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		response.addElement(
			this.app.plugins.getPlugin('rpg-manager').factories.components.create(
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
