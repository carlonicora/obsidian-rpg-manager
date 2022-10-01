import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {SceneHeaderSubModel} from "../subModels/headers/SceneHeaderSubModel";
import {SceneV2Interface} from "../../_dbV2/components/interfaces/SceneV2Interface";

export class SceneNavigationModel extends AbstractModel {
	protected currentElement: SceneV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(
			SceneHeaderSubModel,
			this.currentElement,
			this.currentElement,
			undefined,
			this.sourceMeta,
		);

		return this.response;
	}
}
