import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {AdventureInterface} from "../../interfaces/components/AdventureInterface";
import {HeaderSubModel} from "../subModels/HeaderSubModel";
import {AbtPlotSubModel} from "../subModels/AbtPlotSubModel";

export class AdventureNavigationModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(HeaderSubModel, this.currentElement, this.currentElement);

		if (this.settings.usePlotStructures) {
			if (this.sourceMeta?.abt != null) {
				await this.response.addSubModel(
					AbtPlotSubModel,
					this.currentElement,
					this.currentElement,
					undefined,
					this.sourceMeta.abt,
				);
			}
		}

		return this.response;
	}
}
