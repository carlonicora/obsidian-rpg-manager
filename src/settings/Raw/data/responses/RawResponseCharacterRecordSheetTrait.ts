import {AbstractResponse} from "../../../../abstracts/AbstractResponse";
import {
	RawCharacterRecordSheetTraitResponseInterface
} from "../../interfaces/responses/RawCharacterRecordSheetTraitResponseInterface";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "../../interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";
import {App} from "obsidian";
import {RawTrait} from "../../enums/RawTrait";
import {RawResponseCharacterRecordSheetAbility} from "./RawResponseCharacterRecordSheetAbility";
import {RawAbility, RawAbilityTrait} from "../../enums/RawAbility";

export class RawResponseCharacterRecordSheetTrait extends AbstractResponse implements RawCharacterRecordSheetTraitResponseInterface {
	public abilities: RawCharacterRecordSheetAbilityResponseInterface[];
	private traitValue = 0;

	constructor(
		app:App,
		public trait: RawTrait,
		metadata: any|null,
	) {
		super(app);

		this.abilities = [];

		if (metadata != null) {
			this.value = (metadata.value != null ? metadata.value : 0);
			if (metadata.abilities != null) {
				Object.entries(metadata.abilities).forEach(([abilityName, value]: [string, any]) => {


					this.abilities.push(
						new RawResponseCharacterRecordSheetAbility(
							app,
							null,
							RawAbility[abilityName.toLowerCase() as keyof typeof RawAbility],
							value?.value ?? -10,
							value?.specialisation ?? null,
							this.trait,
							this.traitValue
						)
					);
				});
			}
		}

		Object.keys(RawAbilityTrait).filter((abilityKey) => isNaN(Number(abilityKey))).forEach((abilityKey: string) => {
			const ability: RawAbility = RawAbility[abilityKey as keyof typeof RawAbility];
			if (this.trait === RawAbilityTrait[RawAbility[ability] as keyof typeof RawAbility] && this.getAbility(ability) == null) {
				this.abilities.push(
					new RawResponseCharacterRecordSheetAbility(
						app,
						null,
						ability,
						-10,
						null,
						this.trait,
						this.traitValue
					)
				);
			}
		});
	}

	public get value(): number {
		return this.traitValue;
	}

	public set value(value: number){
		this.traitValue = value;

		this.abilities.forEach((ability: RawCharacterRecordSheetAbilityResponseInterface) => {
			ability.traitValue = this.traitValue;
		});
	}

	public getAbility(
		name: RawAbility,
		specialisation: string|null=null,
	): RawCharacterRecordSheetAbilityResponseInterface|null {
		let response: RawCharacterRecordSheetAbilityResponseInterface|null = null;

		this.abilities.forEach((ability: RawCharacterRecordSheetAbilityResponseInterface) => {
			if (ability.name === name && ability.specialisation === specialisation){
				response = ability;
			}
		});

		return response;
	}
}
