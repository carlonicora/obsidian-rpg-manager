import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ResponseBox} from "../../../data/responses/ResponseBox";
import {SceneDataInterface} from "../../../interfaces/data/SceneDataInterface";

export class SceneNavigationModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		const goalElement = new ResponseBox();
		goalElement.content = (<SceneDataInterface>this.specificData).synopsis;
		goalElement.title = 'Scene Goal';
		goalElement.colour = 'white';
		response.addElement(goalElement);

		const actionsElement = new ResponseBox();
		actionsElement.content = (<SceneDataInterface>this.specificData).action;
		actionsElement.title = 'Player Character\'s Action';
		actionsElement.colour = 'off-white';
		response.addElement(actionsElement);

		return response;
	}
}
