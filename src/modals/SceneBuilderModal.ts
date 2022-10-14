import {App} from "obsidian";
import {AbstractModal} from "./abstracts/AbstractModal";
import {IdInterface} from "../id/interfaces/IdInterface";
import {SceneType, sceneTypeDescription} from "../components/enums/SceneType";

export class SceneBuilderModal extends AbstractModal {
	private scenesContainerEl: HTMLTableSectionElement;
	private hasEmptyLine = false;
	private emptyLines: Map<number, boolean>;
	private idCounter: number;

	constructor(
		app: App,
		private actId: IdInterface,
	) {
		super(app);
		this.maxWidth = true;
		this.title = 'Scene Builder';

		this.emptyLines = new Map<number, boolean>();
		this.idCounter = 0;
	}

	onOpen() {
		super.onOpen();
		const scenesContainerEl = this.rpgmContainerEl.createDiv({cls: 'scenes-container'});

		this._addScenesTable(scenesContainerEl);
	}

	private _updateEmptyLines(
		lineId: number,
		isEmpty: boolean,
		deleteLine = false,
	): void {
		this.emptyLines.set(lineId, isEmpty);

		let emptyLines = 0;
		this.emptyLines.forEach((empty: boolean, id: number) => {
			if (empty === true) emptyLines++;
		});

		if (emptyLines > 1 && deleteLine){
			this.emptyLines.delete(lineId);
			for (let index=0; index<this.scenesContainerEl.rows.length; index++){
				if (this.scenesContainerEl.rows[index].dataset.id === lineId.toString()){
					this.scenesContainerEl.deleteRow(index);
					emptyLines--;
					break;
				}
			}
		}

		this.hasEmptyLine = emptyLines > 0;

		if (!this.hasEmptyLine) {
			this.hasEmptyLine = true;
			this._addSceneLine();
		}
	}

	private _addSceneLine(
	): void {
		const id = this.idCounter++;
		const rowEl = this.scenesContainerEl.insertRow();
		rowEl.dataset.id = id.toString();
		this._updateEmptyLines(id, true);

		const titleCellEl:HTMLTableCellElement = rowEl.insertCell();
		const goalCellEl:HTMLTableCellElement = rowEl.insertCell();
		const typeCellEl:HTMLTableCellElement = rowEl.insertCell();
		const excitingCellEl:HTMLTableCellElement = rowEl.insertCell();

		const titleInputEl: HTMLInputElement = titleCellEl.createEl('input');
		const goalInputEl: HTMLInputElement = goalCellEl.createEl('input');
		const typeSelectionEl: HTMLSelectElement = typeCellEl.createEl('select');
		const excitementCheckboxEl: HTMLInputElement = excitingCellEl.createEl('input');

		/** TYPE */
		typeSelectionEl.createEl('option', {text: '', value: ''}).selected = true;

		Object.keys(SceneType).filter((v) => isNaN(Number(v))).forEach((type, index) => {
			const sceneTypeOptionEl = typeSelectionEl.createEl("option", {
				text: sceneTypeDescription.get(SceneType[type as keyof typeof SceneType]) ?? type,
				value: type,
			});
		});

		/** EXCITEMENT */
		excitementCheckboxEl.type = 'checkbox';

		titleInputEl.addEventListener('keyup', () => {
			this._updateEmptyLines(id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
			);
		});

		titleInputEl.addEventListener('focusout', () =>{
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
				true,
			);
		});

		goalInputEl.addEventListener('keyup', () => {
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
			);
		});

		goalInputEl.addEventListener('focusout', () =>{
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
				true,
			);
		});

		typeSelectionEl.addEventListener('change', () => {
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
				true
			);
		});

		excitementCheckboxEl.addEventListener('change', () => {
			this._updateEmptyLines(
				id,
				(
					titleInputEl.value === '' &&
					goalInputEl.value === '' &&
					typeSelectionEl.value === '' &&
					excitementCheckboxEl.checked === false
				),
				true
			);
		});
	}

	private _addScenesTable(
		containerEl: HTMLDivElement,
	): void {
		const scenesTableEl: HTMLTableElement = containerEl.createEl('table');
		const titleTHeadEl: HTMLTableSectionElement = scenesTableEl.createTHead();
		const titleRowEl: HTMLTableRowElement = titleTHeadEl.insertRow();
		titleRowEl.insertCell().textContent = 'Title';
		titleRowEl.insertCell().textContent = 'Goal';
		titleRowEl.insertCell().textContent = 'Type';
		titleRowEl.insertCell().textContent = 'Exciting?';

		this.scenesContainerEl = scenesTableEl.createTBody();
		this._addSceneLine();
	}
}
