import {AbstractResponse} from "../../../../abstracts/AbstractResponse";
import {
	RawCharacterRecordSheetTraitResponseInterface
} from "../../interfaces/responses/RawCharacterRecordSheetTraitResponseInterface";
import {
	RawCharacterRecordSheetAbilityResponseInterface
} from "../../interfaces/responses/RawCharacterRecordSheetAbilityResponseInterface";
import {App} from "obsidian";
import {RawTrait} from "../../evals/RawTrait";
import {RawResponseCharacterRecordSheetAbility} from "./RawResponseCharacterRecordSheetAbility";
import {RawAbility, RawAbilityTrait} from "../../evals/RawAbility";

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
				Object.entries(metadata.abilities).forEach(([key, value]: [string, any]) => {
					let name: string = key;
					let specialisation: string | null = null;
					const separatorPosition = key.lastIndexOf('/');
					if (separatorPosition !== -1) {
						name = key.substring(0, separatorPosition);
						specialisation = key.substring(separatorPosition + 1).toLowerCase();
					}

					name = name.toLowerCase();
					const abilityDetails = {
						name: name,
						value: -10,
						specialisation: specialisation,
					}

					this.abilities.push(new RawResponseCharacterRecordSheetAbility(app, RawAbility[name as keyof typeof RawAbility], abilityDetails, this.trait, this.traitValue));
				});
			}
		}

		Object.keys(RawAbilityTrait).filter((abilityKey) => isNaN(Number(abilityKey))).forEach((abilityKey: string) => {
			const ability: RawAbility = RawAbility[abilityKey as keyof typeof RawAbility];
			if (this.trait === RawAbilityTrait[RawAbility[ability] as keyof typeof RawAbility] && this.getAbility(ability) == null) {
				const abilityDetails = {
					name: ability,
					value: -10,
				}
				this.abilities.push(new RawResponseCharacterRecordSheetAbility(app, ability, abilityDetails, this.trait, this.traitValue));
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
