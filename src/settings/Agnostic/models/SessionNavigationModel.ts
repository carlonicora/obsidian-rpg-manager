import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ResponseLine} from "../../../data/responses/ResponseLine";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";

export class SessionNavigationModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(this.generateBreadcrumb());

		const status = new ResponseLine();
		status.content =ContentFactory.create(
			((<SessionDataInterface>this.specificData).synopsis != null && (<SessionDataInterface>this.specificData).synopsis !== ''
				? (<SessionDataInterface>this.specificData).synopsis
				: '<span class="rpgm-missing">Synopsis missing</span>'),
			ContentType.Markdown,
		);
		response.addElement(status);

		return response;
	}
}
