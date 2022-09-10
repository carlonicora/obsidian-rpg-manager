import {RawAbility} from "../../evals/RawAbility";
import {RawCharacterRecordSheetTraitResponseInterface} from "./RawCharacterRecordSheetTraitResponseInterface";
import {RawCharacterRecordSheetAbilityResponseInterface} from "./RawCharacterRecordSheetAbilityResponseInterface";

export interface RawCharacterRecordSheetResponseInterface {
	body: RawCharacterRecordSheetTraitResponseInterface;
	mind: RawCharacterRecordSheetTraitResponseInterface;
	spirit: RawCharacterRecordSheetTraitResponseInterface;
	damages: number;

	get lifePoints(): number;
	get lifePointsPercentage(): number;

	getAbility(
		name: RawAbility,
		specialisation: string|null,
	): RawCharacterRecordSheetAbilityResponseInterface|null;
}


