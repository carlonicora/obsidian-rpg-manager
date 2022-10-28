import {TextElementInterface} from "./interfaces/TextElementInterface";
import {AbstractTextElement} from "./abstracts/AbstractTextElement";

export class ShortTextElement extends AbstractTextElement {
	public render(
		data: TextElementInterface,
		containerEl: HTMLElement,
	): void {
		this.renderText(data, containerEl, false);
	}
}
