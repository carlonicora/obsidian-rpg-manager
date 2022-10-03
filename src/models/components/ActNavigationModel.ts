import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ActHeaderSubModel} from "../subModels/headers/ActHeaderSubModel";
import {ActInterface} from "../../database/components/interfaces/ActInterface";

export class ActNavigationModel extends AbstractModel {
	protected currentElement: ActInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(ActHeaderSubModel,this.currentElement,this.currentElement, '', this.sourceMeta);

		return this.response;
	}
}
