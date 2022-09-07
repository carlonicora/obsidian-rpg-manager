import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ResponseLine} from "../../../data/responses/ResponseLine";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {SessionInterface} from "../../../interfaces/data/SessionInterface";

export class SessionNavigationModel extends AbstractModel {
	protected currentElement: SessionInterface;

	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		const status = new ResponseLine();
		status.content =ContentFactory.create(
			(this.currentElement.synopsis != null && this.currentElement.synopsis !== ''
				? this.currentElement.synopsis
				: '<span class="rpgm-missing">Synopsis missing</span>'),
			ContentType.Markdown,
		);
		response.addElement(status);

		return response;
	}
}
