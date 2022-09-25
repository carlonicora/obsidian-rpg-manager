import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {AbtPlotComponent} from "../components/AbtPlotComponent";
import {StoryCirclePlotComponent} from "../components/StoryCirclePlotComponent";

export class ActNavigationModel extends AbstractModel {
	protected currentElement: ActInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent,this.currentElement,this.currentElement);

		if (this.sourceMeta?.abt != null){
			await this.response.addComponent(
				AbtPlotComponent,
				this.currentElement,
				this.currentElement,
				undefined,
				this.sourceMeta.abt,
			);
		}

		if (this.sourceMeta?.storycircle != null){
			await this.response.addComponent(
				StoryCirclePlotComponent,
				this.currentElement,
				this.currentElement,
				undefined,
				this.sourceMeta.storycircle,
			);
		}

		return this.response;
	}
}
