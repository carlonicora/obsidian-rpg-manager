import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {ResponseLine} from "../data/responses/ResponseLine";
import {ContentType} from "../enums/ContentType";

export class ErrorModel extends AbstractModel {
	public async generateData(
	): Promise<ResponseDataInterface> {
		const status = new ResponseLine(this.app);
		status.content =this.app.plugins.getPlugin('rpg-manager').factories.contents.create('<span class="rpgm-missing">The selected function does not exist in Rpg Manager</span>',
			ContentType.Markdown,
		);
		this.response.addElement(status);
		return this.response;
	}
}
