import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ActHeaderSubModel} from "../subModels/headers/ActHeaderSubModel";
import {ActV2Interface} from "../../_dbV2/components/interfaces/ActV2Interface";

export class ActNavigationModel extends AbstractModel {
	protected currentElement: ActV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(ActHeaderSubModel,this.currentElement,this.currentElement, '', this.sourceMeta);

		return this.response;
	}
}
