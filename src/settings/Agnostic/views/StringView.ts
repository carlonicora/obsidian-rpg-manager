import {ViewInterface} from "../../../interfaces/ViewInterface";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {StringResponseInterface} from "../../../interfaces/response/StringResponseInterface";

export class StringView implements ViewInterface {
	constructor(
		private sourcePath: string,
	) {
	}

	render(
		container: HTMLElement,
		data: StringResponseInterface,
	): void {
		const divContainer = container.createDiv();
		data.content.fillContent(divContainer, this.sourcePath);
	}
}
