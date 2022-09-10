import {AbstractView} from "../../../abstracts/AbstractView";
import {RawResponseCharacterRecordSheet} from "../data/responses/RawResponseCharacterRecordSheet";
import {RawAbility} from "../enums/RawAbility";
import {RawTrait} from "../enums/RawTrait";
import {RawDiceRollerModal} from "../modals/RawDiceRollerModal";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "../interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";
import {MarkdownView, parseYaml, stringifyYaml} from "obsidian";
import {DiceRollerHelper} from "../../../helpers/DiceRollerHelper";
import {DiceType} from "../../../enums/DiceType";
import {DiceResult} from "../../../helpers/DiceResult";
import {RawRollResult} from "../enums/RawRollResult";

export class RawCharacterRecordSheetView extends AbstractView {
	private characterRecordSheetContainerEl: HTMLDivElement;

	render(
		container: HTMLElement,
		data: RawResponseCharacterRecordSheet,
	): void {
		let maxAbilities = data.body.abilities.length;
		if (data.mind.abilities.length > maxAbilities) maxAbilities = data.mind.abilities.length;
		if (data.spirit.abilities.length > maxAbilities) maxAbilities = data.spirit.abilities.length;

		container.createEl('h2', {text: 'RAW Character Record Sheet'});
		this.characterRecordSheetContainerEl = container.createDiv({cls: 'rpgm-raw-character-record-shet-container'});
		/*
		const characterRecordSheetHeaderEl = container.createEl('h2', {text: 'RAW Character Record Sheet'});
		this.characterRecordSheetContainerEl = container.createDiv({cls: 'rpgm-raw-character-record-shet-container'});
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
			const abilityEl = row.createEl('td', {cls: (ability.value === -10 ? 'untrained' : ''), text: RawAbility[ability.name] + (ability.specialisation ? '/' + ability.specialisation : '')});
			const abilityValueEl = row.createEl('td', {
				cls: (ability.value === -10 ? 'untrained' : ''),
				text: ability.value.toString()
			});
			abilityEl.addEventListener("click", () => {
				this.upgradeStats(ability, abilityValueEl);
			});
			abilityValueEl.addEventListener("click", () => {
				new RawDiceRollerModal(this.app, ability).open();
			});
		} else {
			row.createEl('td', {text: ''});
			row.createEl('td', {text: ''});
		}
	}

	private async upgradeStats(
		ability: RawCharacterRecordSheetAbilityResponseInterface,
		valueEl: HTMLElement,
	): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView != null) {
			const editor = activeView.editor;
			const file = activeView.file;
			const cache = this.app.metadataCache.getFileCache(file);

			cache?.sections?.forEach(value => {
				if (value.type === 'code'){
					if (
						editor.getLine(value.position.start.line) === '```RpgManager' &&
						editor.getLine(value.position.start.line+1).lastIndexOf('pc') !== -1
					){
						const upgradeRoll:DiceResult = DiceRollerHelper.rollSingleDice(DiceType.d100);
						const abilityToBeat = ability.value + ability.traitValue;

						if (upgradeRoll.result > abilityToBeat){
							const difference = upgradeRoll.result - abilityToBeat;
							let update = Math.floor(difference/25) + 1;

							if (upgradeRoll.rollResult === RawRollResult.CriticalSuccess){
								update *= 2;
							}

							ability.value = (ability.value === -10 ? update : ability.value + update);

							const start = {
								line: value.position.start.line +2,
								ch: 0,
							};
							const end = {
								line: value.position.end.line,
								ch: 0,
							}
							const range = editor.getRange(start, end);
							const yaml = parseYaml(range);

							if (yaml?.raw?.character?.id != null) {
								//Save everything online!
							} else {
								if (yaml?.raw == null) {
									this.addRawMetadata(yaml);
								} else {
									if (yaml.raw?.character == null) {
										this.addCharacterMetadata(yaml);
									} else {
										if (yaml.raw.character?.body == null) this.addTraitMetadata(RawTrait.Body, yaml);
										if (yaml.raw.character?.mind == null) this.addTraitMetadata(RawTrait.Mind, yaml);
										if (yaml.raw.character?.spirit == null) this.addTraitMetadata(RawTrait.Spirit, yaml);
									}
								}

								const traitName = (<string>RawTrait[ability.trait]).toLowerCase();
								const abilityName = (<string>RawAbility[ability.name]).toLowerCase();
								if (yaml.raw.character[traitName].abilities[abilityName] == null) {
									this.addAbilityMetadata(
										ability,
										yaml,
									)
								} else {
									this.updateAbilityValue(
										ability,
										yaml,
									);
								}

								editor.replaceRange(stringifyYaml(yaml), start, end);
							}
						}
					}
				}
			});
		}
	}

	private addRawMetadata(
		yaml: any,
	): void {
		yaml.raw = {};
	}

	private addCharacterMetadata(
		yaml: any,
	): void {
		yaml.raw.character = {
			damages: 0,
		};

		this.addTraitMetadata(RawTrait.Body, yaml);
		this.addTraitMetadata(RawTrait.Mind, yaml);
		this.addTraitMetadata(RawTrait.Spirit, yaml);
	}

	private addTraitMetadata(
		trait: RawTrait,
		yaml: any,
	): void {
		yaml.raw.character[(<string>RawTrait[trait]).toLowerCase()] = {
			value: {},
			abilities: {}
		}
	}

	private addAbilityMetadata(
		ability: RawCharacterRecordSheetAbilityResponseInterface,
		yaml: any,
	): void {
		yaml.raw.character[(<string>RawTrait[ability.trait]).toLowerCase()].abilities[(<string>RawAbility[ability.name]).toLowerCase()] = {
			value: ability.value,
		}

		if (ability.specialisation != null){
			yaml.raw.character[(<string>RawTrait[ability.trait]).toLowerCase()].abilities[(<string>RawAbility[ability.name]).toLowerCase()].specialisation = ability.specialisation;
		}
	}

	private updateAbilityValue(
		ability: RawCharacterRecordSheetAbilityResponseInterface,
		yaml: any,
	): void {
		yaml.raw.character[(<string>RawTrait[ability.trait]).toLowerCase()].abilities[(<string>RawAbility[ability.name]).toLowerCase()].value = ability.value;
	}
}
