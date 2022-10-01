import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {AdventureHeaderSubModel} from "../subModels/headers/AdventureHeaderSubModel";
import {AdventureV2Interface} from "../../_dbV2/components/interfaces/AdventureV2Interface";

export class AdventureNavigationModel extends AbstractModel {
	protected currentElement: AdventureV2Interface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(AdventureHeaderSubModel, this.currentElement, this.currentElement, '', this.sourceMeta);

		return this.response;
	}
}
