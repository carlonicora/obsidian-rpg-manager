import {App, Modal} from "obsidian";
import {DiceRollerHelper} from "../../../helpers/DiceRollerHelper";
import {DiceType} from "../../../enums/DiceType";
import {DiceResult} from "../../../helpers/DiceResult";
import {RawTrait} from "../evals/RawTrait";
import {RawAbility} from "../evals/RawAbility";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "../interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";

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

		let diceResult: number;
		let diceResultLabel = '';
		switch (diceRoll.result) {
			case 1:
				diceResultLabel = 'FUMBLE!';
				diceResult = -20;
				break;
			case 20:
				diceResultLabel = 'CRITICAL SUCCESS!';
				diceResult = 40;
				break;
			default:
				diceResult = diceRoll.result;
				break;
		}

		const result = diceResult + this.ability.value + this.ability.traitValue;

		const successes: number = Math.floor(result/25);

		contentEl.createEl('h2', {text: RawAbility[this.ability.name]});

		contentEl.createDiv({text: 'Ability Value: ' + this.ability.value.toString()})
		contentEl.createDiv({text: 'Trait: ' + RawTrait[this.ability.trait]})
		contentEl.createDiv({text: 'Trait Value: ' + this.ability.traitValue.toString()})
		contentEl.createDiv({text: 'Dice Roll: ' + diceRoll.result.toString() + (diceResultLabel != '' ? ' ' + diceResultLabel + ' (real roll result: ' + diceResult + ')' : '')})
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
