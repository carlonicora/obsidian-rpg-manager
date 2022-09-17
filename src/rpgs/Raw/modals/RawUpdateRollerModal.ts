import {App, Modal} from "obsidian";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "../interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";
import {RawRollResult} from "../enums/RawRollResult";
import {RawAbility} from "../enums/RawAbility";
import {RawTrait} from "../enums/RawTrait";
import {DiceResult} from "../../../helpers/DiceResult";

export class RawUpdateRollerModal extends Modal {
	constructor(
		app: App,
		private ability: RawCharacterRecordSheetAbilityResponseInterface,
		private initialAbilityValue: number,
		private updateRoll: DiceResult,
	) {
		super(app);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();

		contentEl.createEl('h2', {text: 'Upgrade attempt for ' + RawAbility[this.ability.name]});

		contentEl.createDiv({text: 'Ability Value: ' + this.initialAbilityValue.toString()})
		contentEl.createDiv({text: 'Trait: ' + RawTrait[this.ability.trait]})
		contentEl.createDiv({text: 'Trait Value: ' + this.ability.traitValue.toString()})
		contentEl.createDiv({text: 'Dice Roll: ' + this.updateRoll.result.toString()})
		if (this.updateRoll.rollResult === RawRollResult.CriticalSuccess){
			contentEl.createDiv({text: 'Critical Success!'})
		}
		if ((this.initialAbilityValue + this.ability.traitValue) > this.updateRoll.result){
			contentEl.createEl('h2', {text: 'Failed to upgrade'});
		} else {
			const margin = (this.updateRoll.result - (this.initialAbilityValue + this.ability.traitValue));
			contentEl.createDiv({text: 'Success Margin: ' + margin.toString()});
			let upgradePoints = Math.floor(margin/25);
			if (this.updateRoll.rollResult === RawRollResult.CriticalSuccess){
				upgradePoints *= 2;
			}
			contentEl.createDiv({text: 'Upgrade Points: ' + upgradePoints.toString()});
			contentEl.createEl('h2', {text: 'New ability value: ' + this.ability.value.toString()});
		}
	}
}
