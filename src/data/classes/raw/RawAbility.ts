import { RawAbilities } from "@/data/enums/raw/RawAbilities";
import { RawAbilityInterface } from "@/data/enums/raw/RawAbilityInterface";
import { StatsType } from "@/data/enums/raw/StatsType";

export class RawAbility implements RawAbilityInterface {
  constructor(private _data: StatsType, private _key: RawAbilities) {}

  get name(): string {
    return RawAbilities[this._key];
  }
  get value(): number {
    return this._data[this._key] as number;
  }
  set value(value: number) {
    this._data[this._key] = value;
  }
  get passiveValue(): number {
    return Math.floor(this._data[this._key] / 20);
  }
}
