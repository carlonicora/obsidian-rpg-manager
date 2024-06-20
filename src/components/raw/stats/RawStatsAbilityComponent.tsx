import { RpgManagerInterface } from "@/RpgManagerInterface";
import { AttributeType } from "@/data/enums/AttributeType";
import { RawAbilityInterface } from "@/data/enums/raw/RawAbilityInterface";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { RpgManagerCodeblockService } from "@/services/RpgManagerCodeblockService";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function RawStatsAbilityComponent({
  element,
  ability,
}: {
  element: ElementInterface;
  ability: RawAbilityInterface;
}): React.ReactElement {
  const { t } = useTranslation();
  const app: App = useApp();
  const api: RpgManagerInterface = useApi();

  const [editingValue, setEditingValue] = React.useState<boolean>(false);

  const save = (value: number) => {
    ability.value = value;

    const attribute = element.attribute(AttributeType.Stats);

    const codeblockService = new RpgManagerCodeblockService(
      app,
      api,
      element.file,
    );
    codeblockService
      .updateCodeblockSubData([attribute.id, ability.name], value)
      .then(() => {
        setEditingValue(false);
      });
  };

  return (
    <div className="flex flex-row w-full justify-between">
      <div className="flex flex-row w-full justify-between">
        <div className="">
          {t(`raw.stats.abilities.${ability.name.toLowerCase()}`)}
        </div>
        <div className="cursor-pointer w-20 text-end">
          {editingValue ? (
            <input
              className="w-20 text-end"
              type="number"
              defaultValue={ability.value}
              onBlur={(e) => {
                save(e.target.value ? parseInt(e.target.value) : 0);
              }}
            />
          ) : (
            <div onClick={() => setEditingValue(true)}>{ability.value}</div>
          )}
        </div>
      </div>
      <div className="text-sm ml-5 italic">{ability.passiveValue}</div>
    </div>
  );
}
