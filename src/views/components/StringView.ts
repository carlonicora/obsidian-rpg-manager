import {StringResponseInterface} from "../../interfaces/response/StringResponseInterface";
import {AbstractComponentView} from "../../abstracts/AbstractComponentView";

export class StringView extends AbstractComponentView {
	render(
		container: HTMLElement,
		data: StringResponseInterface,
	): void {
		const divContainer = container.createDiv();
		data.content.fillContent(divContainer, this.sourcePath);
	}
}
