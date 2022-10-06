import {AbstractModel} from "./abstracts/AbstractModel";
import {ResponseDataInterface} from "../responses/interfaces/ResponseDataInterface";
import {ComponentType} from "../databases/enums/ComponentType";

export class HeaderModel extends AbstractModel {
	public async generateData(
	): Promise<ResponseDataInterface> {
		if (this.currentComponent.id.type !== ComponentType.Campaign) await this.response.addElement(this.factories.breadcrumb.create(this.currentComponent));

		await this.response.addSubModel(
			this.factories.models.createSubModel(
				this.currentComponent.campaignSettings,
				this.currentComponent.id.type,
				'Header',
			),
			this.currentComponent,
			this.currentComponent,
		);

		return this.response;
	}
}
