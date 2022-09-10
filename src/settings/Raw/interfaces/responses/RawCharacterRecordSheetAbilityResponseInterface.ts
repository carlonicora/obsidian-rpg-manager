import {RawAbility} from "../../evals/RawAbility";
import {RawTrait} from "../../evals/RawTrait";

export interface RawCharacterRecordSheetAbilityResponseInterface {
	name: RawAbility,
	specialisation: string|null;
	value: number;
	trait: RawTrait;
	traitValue: number;
}
