import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {AdventureHeaderSubModel} from "../subModels/headers/AdventureHeaderSubModel";
import {AdventureInterface} from "../../database/components/interfaces/AdventureInterface";

export class AdventureNavigationModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(AdventureHeaderSubModel, this.currentElement, this.currentElement, '', this.sourceMeta);

		return this.response;
	}
}
