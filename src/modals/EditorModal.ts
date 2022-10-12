import {AbstractModal} from "./abstracts/AbstractModal";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";
import {fuzzySearch} from "obsidian";

export class EditorModal extends AbstractModal {
	private inputEl: HTMLInputElement;

	onOpen() {
		super.onOpen();

		this.inputEl = this.rpgmContainerEl.createEl('input', {type: 'text'});
		this.inputEl.addEventListener('keyup', this._analyseKeyUp.bind(this));
	}

	private _analyseKeyUp(
	): void {
		if (this.inputEl.value.substring(this.inputEl.value.length) === '[['){
			console.log(fuzzySearch({query: 'act', tokens: [], fuzzy: []}, 'act'));
			/*
			const matchingComponents = this.database.read<ComponentInterface>((component: ComponentInterface) =>
				component.file.
			);
			*/
		}
	}
}
