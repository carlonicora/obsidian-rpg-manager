import {DiceType} from "../enums/DiceType";

export class DiceResult {
	public type: DiceType;
	public result: number;

	constructor(
		type: DiceType|null = null,
		result: number|null = null,
	) {
		if (type != null) this.type = type;
		if (result != null) this.result = result;
	}
}
