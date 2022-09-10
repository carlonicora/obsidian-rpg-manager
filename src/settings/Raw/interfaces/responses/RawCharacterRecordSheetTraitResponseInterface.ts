import {RawTrait} from "../../evals/RawTrait";
import {RawAbility} from "../../evals/RawAbility";
import {RawCharacterRecordSheetAbilityResponseInterface} from "./RawCharacterRecordSheetAbilityResponseInterface";

export interface RawCharacterRecordSheetTraitResponseInterface {
	trait: RawTrait,
	abilities: RawCharacterRecordSheetAbilityResponseInterface[];

	get value(): number;
	set value(value: number);

	getAbility(
		name: RawAbility,
		specialisation: string|null,
	): RawCharacterRecordSheetAbilityResponseInterface|null;
}
