import {AbstractView} from "../../abstracts/AbstractView";
import {RawResponseCharacterRecordSheet} from "./data/responses/RawResponseCharacterRecordSheet";
import {RawAbility} from "./evals/RawAbility";
import {RawTrait} from "./evals/RawTrait";
import {RawDiceRollerModal} from "./modals/RawDiceRollerModal";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "./interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";

export class RawCharacterRecordSheetView extends AbstractView {
	private characterRecordSheetContainerEl: HTMLDivElement;

	render(
		container: HTMLElement,
		data: RawResponseCharacterRecordSheet,
	): void {
		let maxAbilities = data.body.abilities.length;
		if (data.mind.abilities.length > maxAbilities) maxAbilities = data.mind.abilities.length;
		if (data.spirit.abilities.length > maxAbilities) maxAbilities = data.spirit.abilities.length;

		const characterRecordSheetHeaderEl = container.createEl('h2', {text: 'RAW Character Record Sheet'});
		this.characterRecordSheetContainerEl = container.createDiv({cls: 'rpgm-raw-character-record-shet-container'});
		/*
		characterRecordSheetHeaderEl.addEventListener("click", () => {
			if (this.characterRecordSheetContainerEl.style.display === 'block'){
				this.characterRecordSheetContainerEl.style.display = 'none';
			} else {
				this.characterRecordSheetContainerEl.style.display = 'block';
			}
		});
		this.characterRecordSheetContainerEl.style.display = 'none';
		*/

		const lifePointsEl = this.characterRecordSheetContainerEl.createEl('p');
		lifePointsEl.textContent = 'Life Points: ' + data.lifePoints.toString();
		const damagesEl = this.characterRecordSheetContainerEl.createEl('p');
		damagesEl.textContent = 'Damages: ' + data.damages.toString();

		const table = this.characterRecordSheetContainerEl.createEl('table');
		table.addClass('rpgm-table');

		const header = table.createEl('tr');
		header.createEl('th', {cls: 'raw', text: RawTrait[RawTrait.Body].toString()});
		header.createEl('th', {cls: 'raw', text: data.body.value.toString()});
		header.createEl('th', {cls: 'raw', text: RawTrait[RawTrait.Mind].toString()});
		header.createEl('th', {cls: 'raw', text: data.mind.value.toString()});
		header.createEl('th', {cls: 'raw', text: RawTrait[RawTrait.Spirit].toString()});
		header.createEl('th', {cls: 'raw', text: data.spirit.value.toString()});

		for (let rowCount = 0; rowCount < maxAbilities; rowCount++){
			const row = table.createEl('tr');
			this.addTraitCells(row, data.body.abilities[rowCount]);
			this.addTraitCells(row, data.mind.abilities[rowCount]);
			this.addTraitCells(row, data.spirit.abilities[rowCount]);
		}
	}

	private addTraitCells(
		row: HTMLElement,
		ability: RawCharacterRecordSheetAbilityResponseInterface|null,
	): void {
		if (ability != null){
			row.createEl('td', {cls: (ability.value == -10 ? 'untrained' : ''), text: RawAbility[ability.name] + (ability.specialisation ? '/' + ability.specialisation : '')});
			const abilityValueEl = row.createEl('td', {
				cls: (ability.value == -10 ? 'untrained' : ''),
				text: ability.value.toString()
			});
			abilityValueEl.addEventListener("click", () => {
				new RawDiceRollerModal(this.app, ability).open();
			});
		} else {
			row.createEl('td', {text: ''});
			row.createEl('td', {text: ''});
		}
	}
}
