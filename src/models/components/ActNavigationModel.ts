import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ActInterface} from "../../interfaces/components/ActInterface";
import {AbtPlotSubModel} from "../subModels/AbtPlotSubModel";
import {StoryCirclePlotSubModel} from "../subModels/StoryCirclePlotSubModel";
import {ActHeaderSubModel} from "../subModels/headers/ActHeaderSubModel";

export class ActNavigationModel extends AbstractModel {
	protected currentElement: ActInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(ActHeaderSubModel,this.currentElement,this.currentElement);

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

			if (this.sourceMeta?.storycircle != null) {
				await this.response.addSubModel(
					StoryCirclePlotSubModel,
					this.currentElement,
					this.currentElement,
					undefined,
					this.sourceMeta.storycircle,
				);
			}
		}

		return this.response;
	}
}
