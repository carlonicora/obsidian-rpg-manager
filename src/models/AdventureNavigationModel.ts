import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {HeaderComponent} from "../components/HeaderComponent";
import {AbtPlotComponent} from "../components/AbtPlotComponent";

export class AdventureNavigationModel extends AbstractModel {
	protected currentElement: AdventureInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement, this.currentElement);

		if (this.sourceMeta?.abt != null){
			await this.response.addComponent(
				AbtPlotComponent,
				this.currentElement,
				this.currentElement,
				undefined,
				this.sourceMeta.abt,
			);
		}

		return this.response;
	}
}
