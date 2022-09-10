import {AbstractResponse} from "../../../../abstracts/AbstractResponse";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "../../interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";
import {App} from "obsidian";
import {RawAbility} from "../../evals/RawAbility";
import {RawTrait} from "../../evals/RawTrait";

export class RawResponseCharacterRecordSheetAbility extends AbstractResponse implements RawCharacterRecordSheetAbilityResponseInterface {
	public id: string|null;
	public value: number;
	public specialisation: string|null;

	constructor(
		app: App,
		public name: RawAbility,
		abilityDetails: any,
		public trait: RawTrait,
		public traitValue: number,
	) {
		super(app);

		this.id = abilityDetails?.id;
		this.value = abilityDetails.value;
		this.specialisation = abilityDetails?.specialisation;
	}
}
