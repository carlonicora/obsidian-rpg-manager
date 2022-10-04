import {DiceType} from "./enums/DiceType";
import {RollResult} from "./enums/RollResult";

export class DiceResult {
	public type: DiceType;
	public result: number;
	public rollResult: RollResult;

	constructor(
		type: DiceType|null,
		result: number|null,
	) {
		if (type != null) this.type = type;
		if (result != null){
			this.result = result;

			switch (this.result){
				case 1:
					this.rollResult = RollResult.CriticalFailure;
					break;
				case this.type:
					this.rollResult = RollResult.CriticalSuccess;
					break;
				default:
					this.rollResult = RollResult.Standard;
					break;
			}
		}
	}
}
