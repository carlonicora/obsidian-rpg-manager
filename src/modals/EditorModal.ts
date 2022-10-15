import {AbstractModal} from "./abstracts/AbstractModal";

export class EditorModal extends AbstractModal {
	private _inputEl: HTMLInputElement;

	onOpen() {
		super.onOpen();

		this._inputEl = this.rpgmContainerEl.createEl('input', {type: 'text'});
		this._inputEl.addEventListener('keyup', this._analyseKeyUp.bind(this));
	}

	private _analyseKeyUp(
	): void {
		if (this._inputEl.value.substring(this._inputEl.value.length) === '[['){
			/*
			const matchingComponents = this.database.read<ComponentInterface>((component: ComponentInterface) =>
				component.file.
			);
			*/
		}
	}
}
