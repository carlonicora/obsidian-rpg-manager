import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {AdventureInterface} from "../../../Data";

export class AdventureNavigationModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	generateData(
	): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		return response;
	}
}
