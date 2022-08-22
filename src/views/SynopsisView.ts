import {GenericSynopsisDataInterface} from "../interfaces/DataInterfaces";
import {AbstractSingleView} from "../abstracts/AbstractSingleView";

export class SynopsisView extends AbstractSingleView {
	async render(
		data: GenericSynopsisDataInterface
	): Promise<void> {
		if (data.death !== '') {
			this.dv.span("_Deceased " + data.death  + "_<br/>");
		}

		if (data.title !== null){
			this.dv.span("## " + data.title);
		}

		let response = '';

		if (data.synopsis !== '') {
			if (data.isCharacter) {
				response = data.link +
					(data.death !== '' ? " was " : " is ") +
					data.synopsis;
			} else {
				response = data.synopsis;
			}
		} else {
			response  = "==Synopsis missing==";
		}

		this.dv.span(response);

		this.spacer();
	}
}
