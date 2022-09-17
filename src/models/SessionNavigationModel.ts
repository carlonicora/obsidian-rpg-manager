import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {AbtPlotComponent} from "../components/AbtPlotComponent";
import {StoryCirclePlotComponent} from "../components/StoryCirclePlotComponent";

export class SessionNavigationModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.generateBreadcrumb());

		await this.response.addComponent(HeaderComponent,this.currentElement);

		if (this.sourceMeta?.abt != null){
			await this.response.addComponent(
				AbtPlotComponent,
				this.currentElement,
				undefined,
				this.sourceMeta.abt,
			);
		}

		if (this.sourceMeta?.storycircle != null){
			await this.response.addComponent(
				StoryCirclePlotComponent,
				this.currentElement,
				undefined,
				this.sourceMeta.storycircle,
			);
		}

		return this.response;
	}
}
