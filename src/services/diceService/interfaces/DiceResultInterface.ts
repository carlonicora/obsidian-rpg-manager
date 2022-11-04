import {DiceType} from "../enums/DiceType";
import {RollResult} from "../enums/RollResult";

export interface DiceResultInterface{
	type: DiceType;
	result: number;
	rollResult: RollResult;
}
