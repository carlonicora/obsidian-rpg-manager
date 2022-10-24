import {AbstractRpgManager} from "../../../core/abstracts/AbstractRpgManager";

export abstract class AbstractView extends AbstractRpgManager {
	protected addSeparator(
		containerEl: HTMLDivElement|HTMLSpanElement,
	): void {
		containerEl.createSpan({cls: 'separator', text: ' | '});
	}

	protected addLinkWithFunction(
		containerEl: HTMLDivElement|HTMLSpanElement,
		text: string,
		fn: any,
		isLast = false,
	): void {
		const containerSpanEl: HTMLSpanElement = containerEl.createSpan({cls: 'link'});
		if (isLast) containerSpanEl.addClass('clearfix');

		const anchorEl: HTMLAnchorElement = containerSpanEl.createEl('a', {href: '#', text: text});
		anchorEl.addEventListener('click', fn.bind(this));
	}
}
