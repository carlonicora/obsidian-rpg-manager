import {DiceType} from "./enums/DiceType";
import {DiceResult} from "./DiceResult";

export class DiceRollerHelper {
	public static rollSingleDice(
		diceType: DiceType,
	): DiceResult {
		return this.roll(1, diceType)[0];
	}

	public static roll(
		numberOfDices: number,
		diceType: DiceType,
	): DiceResult[] {
		const response: DiceResult[] = [];

		for (let diceCount=0; diceCount < numberOfDices; diceCount++){
			response.push(
				new DiceResult(
					diceType,
					this.genrateRandomNumber(diceType),
				),
			);
		}

		return response;
	}

	private static genrateRandomNumber(
		max: number,
	) {
		Math.ceil(1);
		Math.floor(max);
		return Math.floor(Math.random() * (max)) + 1;
	}
}
