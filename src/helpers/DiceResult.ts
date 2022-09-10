import {DiceType} from "../enums/DiceType";
import {RawRollResult} from "../settings/Raw/enums/RawRollResult";

export class DiceResult {
	public type: DiceType;
	public result: number;
	public rollResult: RawRollResult;

	constructor(
		type: DiceType|null,
		result: number|null,
	) {
		if (type != null) this.type = type;
		if (result != null){
			this.result = result;

			switch (this.result){
				case 1:
					this.rollResult = RawRollResult.CriticalFailure;
					break;
				case this.type:
					this.rollResult = RawRollResult.CriticalSuccess;
					break;
				default:
					this.rollResult = RawRollResult.Standard;
					break;
			}
		}
	}
}
