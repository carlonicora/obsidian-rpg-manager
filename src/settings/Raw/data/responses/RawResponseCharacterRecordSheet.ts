import {AbstractResponse} from "../../../../abstracts/AbstractResponse";
import {App} from "obsidian";
import {RawAbility} from "../../enums/RawAbility";
import {RawTrait} from "../../enums/RawTrait";
import {ResponseType} from "../../../../enums/ResponseType";
import {
	RawCharacterRecordSheetTraitResponseInterface
} from "../../interfaces/responses/RawCharacterRecordSheetTraitResponseInterface";
import {
	RawCharacterRecordSheetResponseInterface
} from "../../interfaces/responses/RawCharacterRecordSheetResponseInterface";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "../../interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";
import {RawResponseCharacterRecordSheetTrait} from "./RawResponseCharacterRecordSheetTrait";

export class RawResponseCharacterRecordSheet extends AbstractResponse implements RawCharacterRecordSheetResponseInterface {
	public body: RawCharacterRecordSheetTraitResponseInterface;
	public mind: RawCharacterRecordSheetTraitResponseInterface;
	public spirit: RawCharacterRecordSheetTraitResponseInterface;
	public damages: number;

	constructor(
		app:App,
		metadata: any|null,
	) {
		super(app);
		this.responseType = ResponseType.RawCharacterRecordSheet;

		this.body = new RawResponseCharacterRecordSheetTrait(app, RawTrait.Body, metadata?.raw?.character?.body);
		this.mind = new RawResponseCharacterRecordSheetTrait(app, RawTrait.Mind, metadata?.raw?.character?.mind);
		this.spirit = new RawResponseCharacterRecordSheetTrait(app, RawTrait.Spirit, metadata?.raw?.character?.spirit);

		this.damages = metadata?.raw?.character?.damages ?? 0;
	}

	public get lifePoints(
	): number {
		return 30 + this.body.value - this.damages;
	}

	public get lifePointsPercentage(
	): number {
		return Math.trunc(100 * (30 + this.body.value) / this.lifePoints);
	}

	public getAbility(
		name: RawAbility,
		specialisation: string|null=null,
	): RawCharacterRecordSheetAbilityResponseInterface|null {
		let response: RawCharacterRecordSheetAbilityResponseInterface|null = this.body.getAbility(name, specialisation);
		if (response == null) response = this.mind.getAbility(name, specialisation);
		if (response == null) response = this.spirit.getAbility(name, specialisation);

		return response;
	}
}




