import { RawAbilityInterface } from "./RawAbilityInterface";
import { StatsType } from "./StatsType";

export type StatsInterface = {
  get athletics(): RawAbilityInterface;

  get arts(): RawAbilityInterface;

  get drive(): RawAbilityInterface;

  get education(): RawAbilityInterface;

  get empathy(): RawAbilityInterface;

  get investigation(): RawAbilityInterface;

  get medicine(): RawAbilityInterface;

  get melee(): RawAbilityInterface;

  get occult(): RawAbilityInterface;

  get perception(): RawAbilityInterface;

  get persuasion(): RawAbilityInterface;

  get ranged(): RawAbilityInterface;

  get stealth(): RawAbilityInterface;

  get technology(): RawAbilityInterface;

  get willpower(): RawAbilityInterface;

  get health(): number;
  get adjustedHealth(): number;

  set damage(value: number);

  get mana(): number;
  get availableMana(): number;
  set usedMana(value: number);

  get defaultMeleeDamage(): number;
  set defaultMeleeDamage(value: number);

  get defaultRangedDamage(): number;
  set defaultRangedDamage(value: number);

  get armour(): number;
  set armour(value: number);

  get defense(): number;

  get data(): StatsType;
};
