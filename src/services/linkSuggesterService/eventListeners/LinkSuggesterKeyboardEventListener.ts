import {LinkSuggesterEventListenerInterface} from "../interfaces/LinkSuggesterEventListenerInterface";
import {LinkSuggesterPopUpInterface} from "../interfaces/LinkSuggesterPopUpInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class LinkSuggesterKeyboardEventListener implements LinkSuggesterEventListenerInterface {
	public listener: EventListener;

	constructor(
		private _api: RpgManagerApiInterface,
		private _handler: LinkSuggesterPopUpInterface,
	) {
		this.listener = (evt: KeyboardEvent) => this._handleKeyPress(evt);
	}

	private _handleKeyPress(
		evt: KeyboardEvent
	): void {
		if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown' || evt.key === 'Enter' || evt.key === 'Escape') {
			evt.preventDefault();
			switch (evt.key) {
				case "ArrowDown":
					this._handler.moveDown();
					break;
				case "ArrowUp":
					this._handler.moveUp();
					break;
				case "Enter":
					this._handler.select();
					break;
				case "Escape":
					this._handler.hide();
					break;
			}
		}
	}
}
