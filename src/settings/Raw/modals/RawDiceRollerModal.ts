import {App, Modal} from "obsidian";
import {DiceRollerHelper} from "../../../helpers/DiceRollerHelper";
import {DiceType} from "../../../enums/DiceType";
import {DiceResult} from "../../../helpers/DiceResult";
import {RawTrait} from "../enums/RawTrait";
import {RawAbility} from "../enums/RawAbility";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "../interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";
import {RawRollResult} from "../enums/RawRollResult";

export class RawDiceRollerModal extends Modal {
	constructor(
		app: App,
		private ability: RawCharacterRecordSheetAbilityResponseInterface,
	) {
		super(app);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();

		const diceRoll: DiceResult = DiceRollerHelper.rollSingleDice(DiceType.d20);

		let diceResult: number = diceRoll.result;
		if (diceRoll.rollResult === RawRollResult.CriticalSuccess){
			diceResult = 40;
		} else if (diceRoll.rollResult === RawRollResult.CriticalFailure){
			diceResult = -20;
		}
		const result = diceResult + this.ability.value + this.ability.traitValue;

		const successes: number = Math.floor(result/25);

		contentEl.createEl('h2', {text: RawAbility[this.ability.name]});

		contentEl.createDiv({text: 'Ability Value: ' + this.ability.value.toString()})
		contentEl.createDiv({text: 'Trait: ' + RawTrait[this.ability.trait]})
		contentEl.createDiv({text: 'Trait Value: ' + this.ability.traitValue.toString()})
		contentEl.createDiv({text: 'Dice Roll: ' + diceRoll.result.toString() + (diceRoll.rollResult !== RawRollResult.Standard ? ' ' + RawRollResult[diceRoll.rollResult] + ' (real roll result: ' + diceResult + ')' : '')})
		contentEl.createDiv({text: 'Result: ' + result.toString()})
		contentEl.createDiv({text: 'Successes: ' + successes.toString()})
		contentEl.createEl('h2', {text: result.toString()});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
		super.onClose();
	}
}
