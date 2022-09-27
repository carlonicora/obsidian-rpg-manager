import {AbstractResponse} from "../../../../abstracts/AbstractResponse";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "../../interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";
import {App} from "obsidian";
import {RawAbility} from "../../enums/RawAbility";
import {RawTrait} from "../../enums/RawTrait";
import {ComponentInterface} from "../../../../interfaces/database/ComponentInterface";

export class RawResponseCharacterRecordSheetAbility extends AbstractResponse implements RawCharacterRecordSheetAbilityResponseInterface {
	constructor(
		app: App,
		currentElement: ComponentInterface,
		public id: string|null,
		public name: RawAbility,
		public value: number,
		public specialisation: string|null,
		public trait: RawTrait,
		public traitValue: number,
	) {
		super(app, currentElement);
	}
}
