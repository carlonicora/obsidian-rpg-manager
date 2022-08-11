import {GenericImageDataInterface} from "../interfaces/DataInterfaces";
import {AbstractSingleView} from "../abstracts/AbstractSingleView";

export class ImageView extends AbstractSingleView {
	async render(
		data: GenericImageDataInterface
	): Promise<void> {
		if (data.image !== "") {
			this.dv.span(data.image);
			this.spacer();
		}
	}
}
