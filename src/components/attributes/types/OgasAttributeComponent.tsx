import MarkdownComponent from "@/components/markdowns/MarkdownComponent";
import { AttributeType } from "@/data/enums/AttributeType";
import { ElementType } from "@/data/enums/ElementType";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function OgasAttributeComponent({
  element,
}: {
  element: ElementInterface;
}): React.ReactElement {
  const { t } = useTranslation();
  if (element.type !== ElementType.NonPlayerCharacter) return null;

  const occupation: string | undefined = element.attribute(
    AttributeType.Occupation,
  )?.value;
  const stake: number | undefined = element.attribute(
    AttributeType.Stake,
  )?.value;
  const goal: string | undefined = element.attribute(AttributeType.Want)?.value;
  const attitude: string | undefined = element.attribute(
    AttributeType.Behaviour,
  )?.value;

  if (!occupation || !stake || !goal || !attitude) return null;

  const widthPercentage = (stake / 10) * 100;

  return (
    <div className="space-y-3 mt-3 border border-[--background-modifier-border] grid grid-cols-4 p-3 rounded-md text-xs">
      <div className="col-span-4 font-bold text-base">OGAS</div>
      <div className="font-bold">{t("attributes.occupation")}</div>
      <div className="col-span-3">
        <MarkdownComponent key={"occupation"} value={occupation} />
      </div>
      <div className="font-bold">{t("attributes.goals")}</div>
      <div className="col-span-3">
        <MarkdownComponent key={"goals"} value={goal} />
      </div>
      <div className="font-bold">{t("attributes.attitude")}</div>
      <div className="col-span-3">
        <MarkdownComponent key={"attitude"} value={attitude} />
      </div>
      <div className="font-bold">{t("attributes.stake")}</div>
      <div className="col-span-3 pt-1">
        <div className="relative mr-3 h-2 bg-[--background-primary-alt] rounded-full">
          <div
            style={{ width: `${widthPercentage}%` }}
            className="absolute h-2 bg-[--text-accent] rounded-full"
          />
        </div>
        <div className="text-xs text-[--text-faint] text-center">{stake}</div>
      </div>
    </div>
  );
}
