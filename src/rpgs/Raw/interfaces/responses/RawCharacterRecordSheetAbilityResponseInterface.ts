import {RawAbility} from "../../enums/RawAbility";
import {RawTrait} from "../../enums/RawTrait";

export interface RawCharacterRecordSheetAbilityResponseInterface {
	id: string|null,
	name: RawAbility,
	specialisation: string|null;
	value: number;
	trait: RawTrait;
	traitValue: number;
}
