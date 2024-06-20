import ContainerComponent from "@/components/groups/ContainerComponent";
import { RawStats } from "@/data/classes/raw/RawStats";
import { AttributeType } from "@/data/enums/AttributeType";
import { SystemType } from "@/data/enums/SystemType";
import { StatsInterface } from "@/data/enums/raw/StatsInterface";
import { StatsType } from "@/data/enums/raw/StatsType";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import * as React from "react";
import { useTranslation } from "react-i18next";
import RawStatsAbilityComponent from "./RawStatsAbilityComponent";

export default function RawStatsComponent({
  element,
}: {
  element: ElementInterface;
}): React.ReactElement {
  if (
    element.system !== SystemType.RAW ||
    !element.attribute(AttributeType.Stats) ||
    !element.attribute(AttributeType.Stats).isSet
  )
    return null;

  const stats: StatsInterface = new RawStats(
    element.attribute(AttributeType.Stats).value as StatsType,
  );

  const { t } = useTranslation();

  return (
    <ContainerComponent title={t("raw.stats.title")}>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <div className="font-bold bg-[--background-secondary-alt] border-b border-[--background-modifier-border] p-2">
            {t("raw.stats.ability", { count: 2 })}
          </div>
          <div className="flex flex-col w-full pl-3 pr-3">
            <RawStatsAbilityComponent
              element={element}
              ability={stats.athletics}
            />
            <RawStatsAbilityComponent element={element} ability={stats.arts} />
            <RawStatsAbilityComponent element={element} ability={stats.drive} />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.education}
            />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.empathy}
            />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.investigation}
            />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.medicine}
            />
            <RawStatsAbilityComponent element={element} ability={stats.melee} />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.occult}
            />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.perception}
            />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.persuasion}
            />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.ranged}
            />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.stealth}
            />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.technology}
            />
            <RawStatsAbilityComponent
              element={element}
              ability={stats.willpower}
            />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}
