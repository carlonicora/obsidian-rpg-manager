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

		const goalElement = new ResponseBox();
		goalElement.content = this.currentElement.synopsis;
		goalElement.title = 'Scene Goal';
		goalElement.colour = 'white';
		response.addElement(goalElement);

		const actionsElement = new ResponseBox();
		actionsElement.content = this.currentElement.action;
		actionsElement.title = 'Player Character\'s Action';
		actionsElement.colour = 'off-white';
		response.addElement(actionsElement);

		return response;
	}
}
