import {DiceType} from "../enums/DiceType";
import {DiceResult} from "../DiceResult";

export interface DiceServiceInterface {
	roll(
		numberOfDices: number,
		diceType: DiceType,
	): DiceResult[];

	rollSingleDice(
		diceType: DiceType,
	): DiceResult;
}
