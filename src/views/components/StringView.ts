import {StringResponseInterface} from "../../interfaces/response/StringResponseInterface";
import {AbstractView} from "../../abstracts/AbstractView";

export class StringView extends AbstractView {
	render(
		container: HTMLElement,
		data: StringResponseInterface,
	): void {
		const divContainer = container.createDiv();
		data.content.fillContent(divContainer, this.sourcePath);
	}
}
