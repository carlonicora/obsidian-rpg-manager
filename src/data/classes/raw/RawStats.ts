import { RawAbilities } from "@/data/enums/raw/RawAbilities";
import { RawAbilityInterface } from "@/data/enums/raw/RawAbilityInterface";
import { StatsInterface } from "@/data/enums/raw/StatsInterface";
import { StatsType } from "@/data/enums/raw/StatsType";
import { RawAbility } from "./RawAbility";

export class RawStats implements StatsInterface {
  constructor(private _data: StatsType) {}

  get athletics(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Athletics);
  }

  get arts(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Arts);
  }

  get drive(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Drive);
  }

  get education(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Education);
  }

  get empathy(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Empathy);
  }

  get investigation(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Investigation);
  }

  get medicine(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Medicine);
  }

  get melee(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Melee);
  }

  get occult(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Occult);
  }

  get perception(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Perception);
  }

  get persuasion(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Persuasion);
  }

  get ranged(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Ranged);
  }

  get stealth(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Stealth);
  }

  get technology(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Technology);
  }

  get willpower(): RawAbilityInterface {
    return new RawAbility(this._data, RawAbilities.Willpower);
  }

  get health(): number {
    return this._data.Health;
  }
  get adjustedHealth(): number {
    return (
      this.health -
      this.damage +
      this.athletics.passiveValue +
      this.willpower.passiveValue
    );
  }
  set damage(value: number) {
    this._data.Damage = value;
  }

  get mana(): number {
    return this._data.Occult * 5;
  }
  get availableMana(): number {
    return this.mana - this._data.UsedMana;
  }
  set usedMana(value: number) {
    this._data.UsedMana = value;
  }

  get defaultMeleeDamage(): number {
    return this._data.DefaultMeleeDamage;
  }
  set defaultMeleeDamage(value: number) {
    this._data.DefaultMeleeDamage = value;
  }

  get DefaultRangedDamage(): number {
    return this._data.DefaultRangedDamage;
  }
  set defaultRangedDamage(value: number) {
    this._data.DefaultRangedDamage = value;
  }

  get armour(): number {
    return this._data.Armour;
  }
  set armour(value: number) {
    this._data.Armour = value;
  }
  get defense(): number {
    return (
      this.armour +
      Math.max(this.melee.passiveValue, this.athletics.passiveValue)
    );
  }

  get data(): StatsType {
    return this._data;
  }
}
