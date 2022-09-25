import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {HeaderComponent} from "../components/HeaderComponent";

export class SceneNavigationModel extends AbstractModel {
	protected currentElement: SceneInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(
			HeaderComponent,
			this.currentElement,
			this.currentElement,
			undefined,
			this.sourceMeta,
		);

		return this.response;
	}
}
