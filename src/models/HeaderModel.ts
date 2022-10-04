import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ComponentType} from "../enums/ComponentType";

export class HeaderModel extends AbstractModel {
	public async generateData(
	): Promise<ResponseDataInterface> {
		if (this.currentElement.id.type !== ComponentType.Campaign) await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addSubModel(
			this.factories.models.createSubModel(
				this.currentElement.campaignSettings,
				this.currentElement.id.type,
				'Header',
			),
			this.currentElement,
			this.currentElement,
		);

		return this.response;
	}
}
