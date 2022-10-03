import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {SceneHeaderSubModel} from "../subModels/headers/SceneHeaderSubModel";
import {SceneInterface} from "../../database/components/interfaces/SceneInterface";

export class SceneNavigationModel extends AbstractModel {
	protected currentElement: SceneInterface;

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
