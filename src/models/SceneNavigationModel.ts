import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {HeaderComponent} from "../components/HeaderComponent";

export class SceneNavigationModel extends AbstractModel {
	protected currentElement: SceneInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(
			HeaderComponent,
			this.currentElement,
			undefined,
			this.sourceMeta,
		);

		return this.response;
	}
}
