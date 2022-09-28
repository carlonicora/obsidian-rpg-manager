import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ActInterface} from "../../interfaces/components/ActInterface";
import {ActHeaderSubModel} from "../subModels/headers/ActHeaderSubModel";

export class ActNavigationModel extends AbstractModel {
	protected currentElement: ActInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(ActHeaderSubModel,this.currentElement,this.currentElement, '', this.sourceMeta);

		return this.response;
	}
}
